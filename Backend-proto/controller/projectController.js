const Project = require('../models/ProjectModel');
const { buildProjectSlug } = require('../utils/projectSlug');

async function slugExists(slug, excludeId) {
  const query = excludeId ? { slug, _id: { $ne: excludeId } } : { slug };
  const existing = await Project.findOne(query).select('_id').lean();
  return Boolean(existing);
}

async function generateUniqueSlug(title, excludeId) {
  const baseSlug = buildProjectSlug(title, 'project');
  let candidate = baseSlug;
  let suffix = 2;

  while (await slugExists(candidate, excludeId)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

// GET /api/projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('projectType')
      .populate('technologies')
      .populate('languages')
      .sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  try {
    let project = null;

    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(req.params.id)
        .populate('projectType')
        .populate('technologies')
        .populate('languages');
    }

    if (!project) {
      project = await Project.findOne({ slug: req.params.id })
      .populate('projectType')
      .populate('technologies')
      .populate('languages');
    }

    if (!project) return res.status(404).json({ message: 'Projet non trouvé' });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      slug: await generateUniqueSlug(req.body.title),
    };

    const project = new Project(payload);
    await project.save();

    const populated = await Project.findById(project._id)
      .populate('projectType')
      .populate('technologies')
      .populate('languages');

    res.status(201).json(populated);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Données invalides', error: error.message });
  }
};

// PUT /api/projects/reorder
exports.reorderProjects = async (req, res) => {
  try {
    const updates = req.body; // array [{id, order}]

    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: 'Format invalide' });
    }

    const bulkOps = updates.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));

    await Project.bulkWrite(bulkOps);

    res.status(200).json({ message: 'Ordre mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const existingProject = await Project.findById(req.params.id);

    if (!existingProject) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    const payload = {
      ...req.body,
      slug:
        !existingProject.slug || existingProject.title !== req.body.title
          ? await generateUniqueSlug(req.body.title, req.params.id)
          : existingProject.slug,
    };

    const project = await Project.findByIdAndUpdate(req.params.id, payload, {
      returnDocument: 'after',
      runValidators: true,
    })
      .populate('projectType')
      .populate('technologies')
      .populate('languages');

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

// DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) return res.status(404).json({ message: 'Projet non trouvé' });

    res.status(200).json({ message: 'Projet supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
