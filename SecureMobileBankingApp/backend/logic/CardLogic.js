import Card from '../entities/Card.js';

function validateCard(card) {
    if (!card || Object.entries(card).length === 0)
        return { hasErrors: true, message: "You must provide customer's card information!" };

    if (!card.CardTypeID)
        return { hasErrors: true, message: "Card type ID is mandatory!" };

    if (!card.CardNumber)
        return { hasErrors: true, message: "Card number is mandatory!" };

    if (!card.CardHolder)
        return { hasErrors: true, message: "Card holder is mandatory!" };

    if (!card.CardStatus)
        return { hasErrors: true, message: "Card status is mandatory!" };

    if (!card.ExpiryDate)
        return { hasErrors: true, message: "Expiry date is mandatory!" };

    if (!card.UserID)
        return { hasErrors: true, message: "User's address is mandatory!" };

    if (!card.AccountID)
        return { hasErrors: true, message: "Bank account id is mandatory!" };

    return { hasErrors: false, message: "" };

}

async function createCard(card) {
    let error = validateCard(card);
    if (error.hasErrors)
        return error;

    return await Card.create(card);
}

async function getCard() {
    return await Card.findAll();
}

async function getCardById(CardID) {
    return await Card.findByPk(CardID);

}

async function updateCard(id, card) {
    if (parseInt(id) !== card.CardID)
        return { hasErrors: true, message: "Card id different!" };

    let updateEntity = await getCardById(id);

    if (!updateEntity)
        return { hasErrors: true, message: "Card not found!" };

    let error = validateCard(card);
    if (error.hasErrors)
        return error;

    return await updateEntity.update(card);
}

async function deleteCard(id) {
    let deleteEntity = await getCardById(id);

    if (!deleteEntity)
        return { hasErrors: true, message: "Card not found!" };

    return await deleteEntity.destroy();
}

export { createCard, getCard, getCardById, updateCard, deleteCard };