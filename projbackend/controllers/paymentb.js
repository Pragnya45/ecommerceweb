 var braintree = require("braintree");
 
 var gateway = braintree.connect({
    environment : braintree.Environment.Sandbox,
    merchant_id : "rdxzj296vnmc77qb",
    public_key : "x6pd659kmzvhbdrk",
    private_key : "bae3fd7803ff130df1ddefb70465a36e",
 });


 exports.getToken = (req,res) => {
    //let nonceFromTheClient = req.body.paymentMethodNonce
    //let amountFromTheClient = req.body
    gateway.client_token.generate({},
        function (err, response){
        if(err) {
            res.status(500).json(err)
        }else {
          res.send(response)  
        }
        });
    
    };
 

 exports.processPayment = (req,res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce
  let amountFromTheClient = req.body.amount
   gateway.transaction.sale({
    amount:amountFromTheClient,
    paymentMethodNonce: nonceFromTheClients,
    options: {
      submitForSettlement: true
    }

    },function (err, result) {
      if(err) {
        res.status(500).json(err)
    }else {
      res.json(result)  
    }
  }
  );
};
   
 
