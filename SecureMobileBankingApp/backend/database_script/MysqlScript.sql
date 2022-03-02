--SET character_set_server = 'utf8mb4';
--SET collation_server = 'utf8mb4_romanian_ci';

CREATE DATABASE IF not exists SecureMobileBankingAppDatabase 

	CHARACTER SET = 'utf8mb4'
	COLLATE = 'utf8mb4_romanian_ci';
	
	USE SecureMobileBankingAppDatabase;
	
	CREATE TABLE IF NOT EXISTS Customer(
	CustomerID INT(10) NOT NULL AUTO_INCREMENT,
	FirstName VARCHAR(100) NOT NULL,
	LastName  VARCHAR(100) NOT NULL,
	CNP VARCHAR(14) NOT NULL,
	SeriesAndNumber VARCHAR(9) NOT NULL,
	Birthdate DATE NOT NULL,
	Birthplace VARCHAR(255) NOT NULL,
	Address VARCHAR(255) NOT NULL,
	PhoneNumber VARCHAR(12) NOT NULL,
	PhoneNumber2 VARCHAR(12) NOT NULL,
	EmailAddress VARCHAR(30) NOT NULL,
	CreatedAt DATETIME NOT NULL,
	UpdatedAt DATETIME NOT NULL,
	PRIMARY KEY(CustomerID),
	UNIQUE KEY(CNP),
	UNIQUE KEY(SeriesAndNumber)
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	CREATE TABLE if NOT EXISTS UserAccount(
	UserID INT(10) NOT NULL AUTO_INCREMENT, 
	UserLoginID VARCHAR(20) NOT NULL,
	UserPassword VARCHAR(20) NOT NULL,
	CustomerID INT(10) NOT NULL,
	CreatedAt DATETIME NOT NULL,
	UpdatedAt DATETIME NOT NULL,
	PRIMARY KEY(UserID),
	UNIQUE KEY(UserLoginID),
	CONSTRAINT useraccount_fk1 FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	CREATE TABLE if NOT EXISTS CustomerSecurityQuestions(
   QuestionID INT(10) NOT NULL AUTO_INCREMENT, 
	Question VARCHAR(40) NOT NULL,
	CustomerID INT(10) NOT NULL,
	PRIMARY KEY(QuestionID),
	CONSTRAINT customersecurityquestions_fk1 FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	CREATE TABLE if NOT EXISTS CustomerSecurityAnswers(
   AnswerID INT(10) NOT NULL AUTO_INCREMENT, 
	Answer VARCHAR(40) NOT NULL,
	CustomerID INT(10) NOT NULL,
	QuestionID INT(10) NOT NULL,
	PRIMARY KEY(AnswerID),
	CONSTRAINT customersecurityanswers_fk1 FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT customersecurityanswers_fk2 FOREIGN KEY(QuestionID) REFERENCES CustomerSecurityQuestions(QuestionID) ON DELETE CASCADE ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	CREATE TABLE if NOT EXISTS AccountType(
   AccountTypeID INT(2) NOT NULL AUTO_INCREMENT, 
	AccountTypeDescription VARCHAR(40) NOT NULL,
	PRIMARY KEY(AccountTypeID)
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	CREATE TABLE IF NOT EXISTS BankAccount(
	AccountID INT(10) NOT NULL AUTO_INCREMENT,
	AccountTypeID INT(2) NOT NULL,
	IBAN VARCHAR(40) NOT NULL,
	BIC_SWIFT VARCHAR(20) NOT NULL,
	AvailableBalance DECIMAL(12,2) DEFAULT NULL,
	AccountBalance DECIMAL(12,2) DEFAULT NULL,
	BlockedAmounts DECIMAL(12,2) DEFAULT NULL,
	AccountLimits DECIMAL(12,2) DEFAULT NULL,
	CustomerID INT(10) NOT NULL,
	UserID INT(10) NOT NULL,
	CreatedAt DATETIME NOT NULL,
	UpdatedAt DATETIME NOT NULL,
	PRIMARY KEY(AccountID),
	UNIQUE KEY(IBAN),
	CONSTRAINT bankaccount_fk1 FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT bankaccount_fk2 FOREIGN KEY(UserID) REFERENCES UserAccount(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT bankaccount_fk3 FOREIGN KEY(AccountTypeID) REFERENCES AccountType(AccountTypeID) ON DELETE CASCADE ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	CREATE TABLE if NOT EXISTS CardType(
   CardTypeID INT(2) NOT NULL AUTO_INCREMENT, 
	CardTypeDescription VARCHAR(40) NOT NULL,
	PRIMARY KEY(CardTypeID)
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	CREATE TABLE IF NOT EXISTS Card(
	CardID INT(10) NOT NULL AUTO_INCREMENT,
	CardTypeID INT(2) NOT NULL,
	CardNumber VARCHAR(20) NOT NULL,
	CardHolder VARCHAR(20) NOT NULL,
	CardStatus ENUM('ACTIVE','INACTIVE') NOT NULL,
   ExpiryDate DATE NOT NULL,
	CreditLimit DECIMAL(12,2) DEFAULT NULL,
	CustomerID INT(10) NOT NULL,
	UserID INT(10) NOT NULL,
	AccountID INT(10) NOT NULL,
	CreatedAt DATETIME NOT NULL,
	UpdatedAt DATETIME NOT NULL,
	PRIMARY KEY(CardID),
	UNIQUE KEY(CardNumber),
	CONSTRAINT card_fk1 FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT card_fk2 FOREIGN KEY(UserID) REFERENCES UserAccount(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT card_fk3 FOREIGN KEY(AccountID) REFERENCES BankAccount(AccountID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT card_fk4 FOREIGN KEY(CardTypeID) REFERENCES CardType(CardTypeID) ON DELETE CASCADE ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
   
   CREATE TABLE if NOT EXISTS TransactionType(
   TransactionTypeID INT(2) NOT NULL AUTO_INCREMENT, 
	TransactionTypeDescription VARCHAR(40) NOT NULL,
	PRIMARY KEY(TransactionTypeID)
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
   CREATE TABLE IF NOT EXISTS Transactions(
	TransactionID INT(10) NOT NULL AUTO_INCREMENT,
	TransactionTypeID INT(2) NOT NULL,
   TransactionDate DATE NOT NULL,
   ValueDate DATE NOT NULL,
	Amount DECIMAL(12,2) NOT NULL,
	Description VARCHAR(255) NOT NULL,
	CustomerID INT(10) NOT NULL,
	UserID INT(10) NOT NULL,
	AccountID INT(10) NOT NULL,
	PRIMARY KEY(TransactionID),
	CONSTRAINT transactions_fk1 FOREIGN KEY(CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT transactions_fk2 FOREIGN KEY(UserID) REFERENCES UserAccount(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT transactions_fk3 FOREIGN KEY(AccountID) REFERENCES BankAccount(AccountID) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT transactions_fk4 FOREIGN KEY(TransactionTypeID) REFERENCES TransactionType(TransactionTypeID) ON DELETE CASCADE ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARSET UTF8MB4 COLLATE UTF8MB4_ROMANIAN_CI;
	
	-- SHOW DATABASES;
	-- USE SECUREMOBILEBANKINGAPPDATABASE;
	-- SHOW TABLES;
	-- SELECT * FROM bankaccount;