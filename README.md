# NASA-19110331
# To run this project, cd to NASA-19110331 directory, and run following command:
- if you run code from github:
1. npm install
2. 'npm run watch' or 
    'npm run deploy' and open address 'http://localhost:8000' on your browser

- if you run code from zip file:
1. 'npm run watch' or
    'npm run deploy' and open address 'http://localhost:8000' on your browser

# To test this project, you need to run server firstly: Open second terminal:
    1. cd to 'server' directory 
    2. npm start
# Secondly, go back to the first terminal:
    1. in 'NASA-19110331' directory, run 'npm test'

#Note: The test will test in 4 API mainly:
1. GET /planets to get all planets
2. GET /launches to get all launches 
3. POST /launches to add a launch (This one will have 6 test case)
4. DELETE /launches/:id to delete a launches (This one will have 2 test case)
We have 10 test case in total.
