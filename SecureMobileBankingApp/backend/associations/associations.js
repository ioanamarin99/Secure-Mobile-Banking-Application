import UserAccount from '../entities/UserAccount.js';
import BankAccount from '../entities/BankAccount.js';
import AccountType from '../entities/AccountType.js';
import Card from '../entities/Card.js';
import CardType from '../entities/CardType.js';

function associations(){
UserAccount.hasMany(BankAccount, {as: "BankAccounts", foreignKey: "UserID"});
BankAccount.belongsTo(UserAccount, {foreignKey: "UserID"});

UserAccount.hasMany(Card, {as: "Cards", foreignKey: "UserID"});
Card.belongsTo(UserAccount, {foreignKey: "UserID"});

BankAccount.hasMany(Card, {as: "Cards", foreignKey: "AccountID"});
Card.belongsTo(BankAccount, {foreignKey: "AccountID"});

BankAccount.hasMany(AccountType, {as: "AccountTypes", foreignKey: "AccountTypeID"});
AccountType.belongsTo(BankAccount, {foreignKey: "AccountTypeID"});

Card.hasMany(CardType, {as: "CardTypes", foreignKey: "CardTypeID"});
CardType.belongsTo(Card, {foreignKey: "CardTypeID"});
}
 export {associations};