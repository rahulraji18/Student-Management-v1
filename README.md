steps =>
    1. npm install 
    2. Add .env file to add these vars
            MONGODB_URL => db_url ('mongodb://localhost:27017/student')
            PORT        => Port number (3000)
            GMAIL       => Mail for sending messages for student create, edit and delete
            PASSWORD    => Password of Mail Id            
    3. Run using this command
       npm run dev
    4. Landing page => 
        http://localhost:3000/auth/login

>>>>Functionality

1. Register (Admin) 
2. Login after signup 
3. List Student
4. Add new Student (including profile picture)
5. Edit, View, Delete student Details (including profile picture)
6. Send  mail to the student after completing student registration,edit and delete 
7. Pagination on student list 
8. Filtering data based on asc and desc order
9. Add branch
10. View all branch in student registration(select box)
11. Search student in student list
12. Confirmation for delete
13. Forgot Password
14. Logout


>>>>Packages
    >bcrypt
    >body-parser
    >dotenv
    >express
    >express-session
    >ejs
    >http-error
    >mongoose
    >morgan
    >multer
    >nodemailer
    >passport
    >passport-local
    >path

 


