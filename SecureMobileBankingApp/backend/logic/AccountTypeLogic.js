import AccountType from '../entities/AccountType.js';

function validateAccountType(accountType) {
    if (!accountType || Object.entries(accountType).length === 0)
        return { hasErrors: true, message: "You must provide account type information!" };

    if (!accountType.AccountTypeDescription)
        return { hasErrors: true, message: "Bank account type description is mandatory!" };

    return { hasErrors: false, message: "" };

}

async function createAccountType(accountType) {
    let error = validateAccountType(accountType);
    if (error.hasErrors)
        return error;

    return await AccountType.create(accountType);
}

async function getAccountType() {
    return await AccountType.findAll();
}

async function getAccountTypeById(AccountTypeID) {
    return await AccountType.findByPk(AccountTypeID);

}

async function updateAccountType(id, accountType) {
    if (parseInt(id) !== accountType.AccountTypeID)
        return { hasErrors: true, message: "Account type id different!" };

    let updateEntity = await getAccountTypeById(id);

    if (!updateEntity)
        return { hasErrors: true, message: "Account type not found!" };

    let error = validateAccountType(accountType);
    if (error.hasErrors)
        return error;

    return await updateEntity.update(accountType);
}

async function deleteAccountType(id) {
    let deleteEntity = await getAccountTypeById(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Account type not found!" };

    return await deleteEntity.destroy();
}

export { createAccountType, getAccountType, getAccountTypeById, updateAccountType, deleteAccountType };