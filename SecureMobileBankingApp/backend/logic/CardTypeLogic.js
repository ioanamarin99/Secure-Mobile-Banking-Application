import CardType from '../entities/CardType.js';

function validateCardType(cardType) {
    if (!cardType || Object.entries(cardType).length === 0)
        return { hasErrors: true, message: "You must provide card's type information!" };

    if (!cardType.CardTypeDescription)
        return { hasErrors: true, message: "Card type description is mandatory!" };

    return { hasErrors: false, message: "" };

}

async function createCardType(cardType) {
    let error = validateCardType(cardType);
    if (error.hasErrors)
        return error;

    return await CardType.create(cardType);
}

async function getCardType() {
    return await CardType.findAll();
}

async function getCardTypeById(CardTypeID) {
    return await CardType.findByPk(CardTypeID);

}

async function updateCardType(id, cardType) {
    if (parseInt(id) !== cardType.CardTypeID)
        return { hasErrors: true, message: "Card type id different!" };

    let updateEntity = await getCardTypeById(id);

    if (!updateEntity)
        return { hasErrors: true, message: "Card type not found!" };

    let error = validateCardType(cardType);
    if (error.hasErrors)
        return error;

    return await updateEntity.update(cardType);
}

async function deleteCardType(id) {
    let deleteEntity = await getCardTypeById(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Card type not found!" };

    return await deleteEntity.destroy();
}

export {createCardType, getCardType, getCardTypeById, updateCardType, deleteCardType};