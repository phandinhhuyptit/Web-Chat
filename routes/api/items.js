const express = require('express');
const router = express.Router();
// Model Item 

// @route GET api/items
// @desc GET All Items
// @acess Public

//   Items = [
//       {
//         name : ''

//       }
// ] 
const Item = require('../../models/Item');

 
router.get('/', (req, res) => {    

    Item.find()
    .select('name date _id')
    .sort({date : -1})
    .then(items =>res.json({

        Data : items
    }))
    .catch(err=>{

        console.log(err);

    })
})

router.get('/:id',(req,res)=>{

    const id = req.params.id;
    return Item.findById(id)
    .select('name date _id')
    .then(item =>{

        res.status(200).json({

            detailItem : item

        })

    })
        .catch(err => {

            res.status(500).json({

                message: err

            })
        })
})


router.delete('/:id',(req,res)=>{

     const id = req.params.id;    

     return Item.findById(id)
     .then( item =>{

        item.remove()
        .then(()=>{

                res.status(200).json({

                    message : 'successful'

                })   


        }) 
        .catch(err =>{

            res.status(500).json({
                message : err
            })

        })


     })
     .catch( err =>{

        res.status(500).json({

            messsage : err

        })

     })
})
router.post('/', (req, res) => {

    const item = new Item({
        name: req.body.name
    })
    
    
    return item.save()
        .then(item => {

            res.status(201).json({
                createItems: item
            })
       })
       .catch(error=>{

        res.status(500).json({

            message : error
        })       

       })
})

module.exports = router