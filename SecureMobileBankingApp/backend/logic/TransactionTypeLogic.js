import TransactionType from '../entities/TransactionType.js';

function validateTransactionType(transactionType) {
    if (!transactionType || Object.entries(transactionType).length === 0)
        return { hasErrors: true, message: "You must provide customer's transaction type information!" };

    if (!transactionType.TransactionTypeDescription)
        return { hasErrors: true, message: "Transaction type description is mandatory!" };

    return { hasErrors: false, message: "" };

}

async function createTransactionType(transactionType) {
    let error = validateTransactionType(transactionType);
    if (error.hasErrors)
        return error;

    return await TransactionType.create(transactionType);
}

async function getTransactionType() {
    return await TransactionType.findAll();
}

async function getTransactionTypeById(TransactionTypeID) {
    return await TransactionType.findByPk(TransactionTypeID);

}

async function updateTransactionType(id, transactionType) {
    if (parseInt(id) !== transactionType.TransactionTypeID)
        return { hasErrors: true, message: "Transaction's type id different!" };

    let updateEntity = await getTransactionTypeById(id);

    if (!updateEntity)
        return { hasErrors: true, message: "Transaction type not found!" };

    let error = validateTransactionType(transactionType);
    if (error.hasErrors)
        return error;

    return await updateEntity.update(transactionType);
}

async function deleteTransactionType(id) {
    let deleteEntity = await getTransactionTypeById(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Transaction type not found!" };

    return await deleteEntity.destroy();
}

export { createTransactionType, getTransactionType, getTransactionTypeById, updateTransactionType, deleteTransactionType };