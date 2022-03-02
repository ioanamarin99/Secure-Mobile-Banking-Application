import UserAccount from '../entities/UserAccount.js';

function validateUserAccount(userAccount) {
    if (!userAccount || Object.entries(userAccount).length === 0)
        return { hasErrors: true, message: "You must provide user's information!" };

    if (!userAccount.UserName)
        return { hasErrors: true, message: "User's complete name is mandatory!" };

    if (!userAccount.UserLoginID)
        return { hasErrors: true, message: "User's login ID is mandatory!" };

    if (!userAccount.UserPassword)
        return { hasErrors: true, message: "User's password is mandatory!" };
    

    return { hasErrors: false, message: "" };
}

async function createUserAccount(userAccount) {
    let error = validateUserAccount(userAccount);
    if (error.hasErrors)
        return error;

    return await UserAccount.create(userAccount);
}

async function getUserAccount() {
    return await UserAccount.findAll();
}

async function getUserAccountById(UserID) {
    return await UserAccount.findByPk(UserID);

}

async function updateUserAccount(id, userAccount) {
    if (parseInt(id) !== userAccount.UserID)
        return { hasErrors: true, message: "User's id different!" };

    let updateEntity = await getUserAccountById(id);

    if (!updateEntity)
        return { hasErrors: true, message: "User not found!" };

    let error = validateUserAccount(userAccount);
    if (error.hasErrors)
        return error;

    return await updateEntity.update(userAccount);
}

async function deleteUserAccount(id) {
    let deleteEntity = await getUserAccountById(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "User not found!" };

    return await deleteEntity.destroy();
}

export { createUserAccount, getUserAccount, getUserAccountById, updateUserAccount, deleteUserAccount };