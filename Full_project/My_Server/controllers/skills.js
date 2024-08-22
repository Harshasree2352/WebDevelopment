const { skillModel } = require("../models/skill.js")



const handleGetApiSkill = async (req,res) => 
{
    try {
        const Skills = await skillModel.find({});
        res.json(Skills);
    }  
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve Skills' });
    }
}



const handleGetSkill = async (req,res) => {
    try{
        return res.render('skills');
    }
    catch(err)
    {
        return res.json({ error:"Error in rendering home page" });
    }
}


const handlePostApiSkill = async (req,res) => {
    
    // getting Skill data from the form
    try{
        const { SkillName, SkillDescription, learnedFrom, projects, certifications } = req.body;
        const learnedFromArray =  learnedFrom.split(',').map(skill => skill.trim()); 
        const projectsArray =  projects.split(',').map(skill => skill.trim()); 
        const certificationsArray =  certifications.split(',').map(skill => skill.trim()); 
       

        const newSkill = await skillModel.create({
        skillName:SkillName,
        description:SkillDescription,
        learnedFrom:learnedFromArray,
        projects:projectsArray,
        certificates:certificationsArray,
        });
        return res.redirect('/api/skills');
    }
    catch(err){
        return res.json({ error:"Error in getting Skill data", err: err });   
    }
}

module.exports = {
    handleGetApiSkill,
    handleGetSkill,
    handlePostApiSkill,
}