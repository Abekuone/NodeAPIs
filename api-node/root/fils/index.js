const { PrismaClient } = require('@prisma/client');
const router = require('express').Router();
const prisma = new PrismaClient();


router.get('/fils', async (req, res, next) => {
	try{
		const fils = await prisma.fils.findMany()
		res.json(fils)
	}catch(error) {
		next(error)
	}

})


router.get('/pere', async (req, res, next) => {
	try{
		const pere = await prisma.pere.findMany({
			include : { fils : true }
		})
		res.status(200).json({
      data : pere,
      message : "succes"
    })
	}catch(error) {
		res.status(500).json({
      message : "erreur survenu"
    })
	}
})


router.post('/ajoutpere', async (req, res, next) => {
  const { nom, prenom } = req.body;

  try {
    const pereAjouter = await prisma.pere.create({
      data: {
        nom: nom,
        prenom: prenom
      },
    });
    res.json({data:pereAjouter});
  } catch (error) {
    next(error);
  }
});


router.post('/modifierpere/:id', async (req, res, next) => {
  const { nom, prenom } = req.body;
  const { id }= req.params;

  try {
    const pereUpdate = await prisma.pere.update({
      where: {
      	id: Number(id)
      },
      data: {
        nom: nom,
        prenom: prenom
      },
    });
    res.json(pereUpdate);
  } catch (error) {
    next(error);
  }
});


router.delete('/supprimerpere/:id', async (req, res, next) => {
  const { nom, prenom } = req.body;
  const { id }= req.params;

  try {
    const pereDelete = await prisma.pere.delete({
      where: {
      	id: Number(id)
      },
      include : { fils : true }
    });
    res.json(pereDelete);
  } catch (error) {
    next(error);
  }
});



router.post('/ajoutfils', async (req, res, next) => {
  const { nom, prenom, PereId } = req.body;

  console.log(req.body)

  if(!nom){
  	return res.status(400).json({
  		status :"error",
  		message : "Veuillez renseigner le nom"
  	});
  }

    if(!prenom){
  	return res.status(400).json({
  		status :"error",
  		message : "Veuillez renseigner le prenom"
  	});
  }

  const pereTrouver = await prisma.pere.findUnique({
  	where:{ id : Number(PereId) }
  })

  if(!pereTrouver){
  	return res.status(400).json({
  		status :"error",
  		message : `Impossible de trouver le pere avec id { $PereId }`
  	});
  }

  try {
    const filsAjouter = await prisma.fils.create({
      data: {
        nom: nom,
        prenom: prenom,
        PereId: Number(PereId)
      },
    });
    res.json(filsAjouter);
  } catch (error) {

    console.log(error)
    next(error);
  }
});


router.post('/modifierfils/:id', async (req, res, next) => {
  const { nom, prenom, PereId } = req.body;
  const { id }= req.params;

  try {
    const filsUpdate = await prisma.fils.update({
      where: {
      	id: Number(id)
      },
      data: {
        nom: nom,
        prenom: prenom
      },
    });
    res.json(filsUpdate);
  } catch (error) {
    next(error);
  }
});


router.delete('/supprimerfils/:id', async (req, res, next) => {
  const { nom, prenom, PereId } = req.body;
  const { id }= req.params;

  try {
    const filsDelete = await prisma.fils.delete({
      where: {
      	id: Number(id)
      },
    });
    res.json(filsDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;