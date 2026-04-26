const ProjectType = require('../models/ProjectTypeModel');
const Technology = require('../models/TechnologyModel');
const ProgrammingLanguage = require('../models/ProgrammingLanguageModel');

/* =========================
   ProjectType Controllers
========================= */
exports.getAllProjectTypes = async (req, res) => {
  try {
    const types = await ProjectType.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getProjectTypeById = async (req, res) => {
  try {
    const type = await ProjectType.findById(req.params.id);
    if (!type) return res.status(404).json({ message: 'Type non trouvé' });
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.createProjectType = async (req, res) => {
  try {
    const type = new ProjectType(req.body);
    await type.save();
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

exports.updateProjectType = async (req, res) => {
  try {
    const type = await ProjectType.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!type) return res.status(404).json({ message: 'Type non trouvé' });
    res.status(200).json(type);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

exports.deleteProjectType = async (req, res) => {
  try {
    const type = await ProjectType.findByIdAndDelete(req.params.id);
    if (!type) return res.status(404).json({ message: 'Type non trouvé' });
    res.status(200).json({ message: 'Type supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/* =========================
   Technology Controllers
========================= */
exports.getAllTechnologies = async (req, res) => {
  try {
    const techs = await Technology.find();
    res.status(200).json(techs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getTechnologyById = async (req, res) => {
  try {
    const tech = await Technology.findById(req.params.id);
    if (!tech)
      return res.status(404).json({ message: 'Technologie non trouvée' });
    res.status(200).json(tech);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.createTechnology = async (req, res) => {
  try {
    const tech = new Technology(req.body);
    await tech.save();
    res.status(201).json(tech);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

exports.updateTechnology = async (req, res) => {
  try {
    const tech = await Technology.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!tech)
      return res.status(404).json({ message: 'Technologie non trouvée' });
    res.status(200).json(tech);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

exports.deleteTechnology = async (req, res) => {
  try {
    const tech = await Technology.findByIdAndDelete(req.params.id);
    if (!tech)
      return res.status(404).json({ message: 'Technologie non trouvée' });
    res.status(200).json({ message: 'Technologie supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/* =========================
   ProgrammingLanguage Controllers
========================= */
exports.getAllLanguages = async (req, res) => {
  try {
    const langs = await ProgrammingLanguage.find();
    res.status(200).json(langs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getLanguageById = async (req, res) => {
  try {
    const lang = await ProgrammingLanguage.findById(req.params.id);
    if (!lang) return res.status(404).json({ message: 'Langage non trouvé' });
    res.status(200).json(lang);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.createLanguage = async (req, res) => {
  try {
    const lang = new ProgrammingLanguage(req.body);
    await lang.save();
    res.status(201).json(lang);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const lang = await ProgrammingLanguage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    if (!lang) return res.status(404).json({ message: 'Langage non trouvé' });
    res.status(200).json(lang);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

exports.deleteLanguage = async (req, res) => {
  try {
    const lang = await ProgrammingLanguage.findByIdAndDelete(req.params.id);
    if (!lang) return res.status(404).json({ message: 'Langage non trouvé' });
    res.status(200).json({ message: 'Langage supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
