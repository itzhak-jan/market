הוראות התקנה: 
גם בצד שרת וגם בצד לקוח - רק npm start, כי העליתי הכל כולל node_modules.
העליתי גם את הקבצי DB -אז:
הורדה ופתיחה של הקבצי DB (יש שם גם טבלת קטגוריות עם 6 קטגוריות טבלת הזמנות ריקה וטבלת מוצרים עם-26 מוצרים לדוגמא), 
עדכון פרטי התחברות לDB בקובץ:\server\src\dal\connection-wrapper.ts
בשורות 4-8:
const config: sqlConfig = {
    user: "root",
    password: "1234",
    server: "localhost",
    database: "market",
    options: {
        encrypt: false,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};
 
 בכל מקרה מה יש בפרויקט:
 הצגה של הקטגוריות,
 הצגה של המוצרים בכל קטגוריה,
 עגלה אישית שניתן להוסיף/להוריד ממנה מוצרים,
 חיפוש מוצרים פעיל,
 הוספת מוצר,
 וסגירת הזמנה והדפבת קבלהה בPDF,
 דאטאבייס מסוג SQL Server

 סך הכל היה תרגיל מעניין ומאתגר, אז ממש תודה!!
