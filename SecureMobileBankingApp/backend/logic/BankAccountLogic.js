import BankAccount from '../entities/BankAccount.js';

function validateBankAccount(bankAccount) {
    if (!bankAccount || Object.entries(bankAccount).length === 0)
        return { hasErrors: true, message: "You must provide customer's bank account information!" };

    if (!bankAccount.AccountTypeID)
        return { hasErrors: true, message: "Bank account type ID is mandatory!" };

    if (!bankAccount.AccountNumber)
        return { hasErrors: true, message: "Account number is mandatory!" };

    if (!bankAccount.BIC_SWIFT)
        return { hasErrors: true, message: "BIC/SWIFT code is mandatory!" };

    if (!bankAccount.UserID)
        return { hasErrors: true, message: "User's birthplace is mandatory!" };

    return { hasErrors: false, message: "" };

}

async function createBankAccount(bankAccount) {
    let error = validateBankAccount(bankAccount);
    if (error.hasErrors)
        return error;

    return await BankAccount.create(bankAccount);
}

async function getBankAccount() {
    return await BankAccount.findAll();
}

async function getBankAccountById(AccountID) {
    return await BankAccount.findByPk(AccountID);

}

async function updateBankAccount(id, bankAccount) {
    if (parseInt(id) !== bankAccount.AccountID)
        return { hasErrors: true, message: "Bank account id different!" };

    let updateEntity = await getBankAccountById(id);

    if (!updateEntity)
        return { hasErrors: true, message: "Bank account not found!" };

    let error = validateBankAccount(bankAccount);
    if (error.hasErrors)
        return error;

    return await updateEntity.update(bankAccount);
}

async function deleteBankAccount(id) {
    let deleteEntity = await getBankAccountById(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Bank account not found!" };

    return await deleteEntity.destroy();
}

export { createBankAccount, getBankAccount, getBankAccountById, updateBankAccount, deleteBankAccount };