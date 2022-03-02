import Transactions from '../entities/Transactions.js';

function validateTransaction(transaction) {
    if (!transaction || Object.entries(transaction).length === 0)
        return { hasErrors: true, message: "You must provide customer's transaction information!" };

    if (!transaction.TransactionTypeID)
        return { hasErrors: true, message: "Transaction type is mandatory!" };
 
    if(!transaction.AssociatedIAccountNumber)
        return{hasErrors: true, message: "Associated account number is mandatory!"};
  
    if(transaction.AssociatedIAccountNumber.length < 24)
        return{hasErrors: true, message: "Account number is too short!"};

    if(transaction.AssociatedIAccountNumber.length > 24)
        return{hasErrors: true, message: "Account number is too long!"};
    
    if(!transaction.BeneficiaryOrRemitter)
        return{hasErrors: true, message: "Beneficiary or remitter is mandatory"};

    if (!transaction.Amount || !typeof(transaction.Amount) === 'number')
        return { hasErrors: true, message: "Amount is mandatory, it must be a number!" };
       
    if (!transaction.Description)
        return { hasErrors: true, message: "Description is mandatory!" };
   
    if (!transaction.TransactionDate)
        return { hasErrors: true, message: "Transaction date is mandatory!" };

    if (!transaction.ValueDate)
        return { hasErrors: true, message: "Value date is mandatory!" };

    if (!transaction.UserID)
        return { hasErrors: true, message: "User's ID is mandatory!" };

    if (!transaction.AccountID)
        return { hasErrors: true, message: "Bank account ID is mandatory!" };

    return { hasErrors: false, message: "" };

}

async function createTransaction(transaction) {
    let error = validateTransaction(transaction);
    if (error.hasErrors)
        return error;

    return await Transactions.create(transaction);
}

async function getTransaction() {
    return await Transactions.findAll({order: [['CreatedAt', 'DESC']]});
}

async function getTransactionById(TransactionID) {
    return await Transactions.findByPk(TransactionID);

}

async function updateTransaction(id, transaction) {
    if (parseInt(id) !== transaction.TransactionID)
        return { hasErrors: true, message: "Transaction's id different!" };

    let updateEntity = await getTransactionById(id);

    if (!updateEntity)
        return { hasErrors: true, message: "Transaction not found!" };

    let error = validateTransaction(transaction);
    if (error.hasErrors)
        return error;

    return await updateEntity.update(transaction);
}

async function deleteTransaction(id) {
    let deleteEntity = await getTransactionById(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Transaction not found!" };

    return await deleteEntity.destroy();
}

export { createTransaction, getTransaction, getTransactionById, updateTransaction, deleteTransaction };