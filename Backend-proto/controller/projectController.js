const Project = require('../models/ProjectModel');

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
    const project = await Project.findById(req.params.id)
      .populate('projectType')
      .populate('technologies')
      .populate('languages');

    if (!project) return res.status(404).json({ message: 'Projet non trouvé' });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Erreur création project:', error); // <-- ajouter ça
    res
      .status(400)
      .json({ message: 'Données invalides', error: error.message });
  }
};

// PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!project) return res.status(404).json({ message: 'Projet non trouvé' });

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error });
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
