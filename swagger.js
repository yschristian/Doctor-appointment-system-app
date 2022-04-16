import dotenv from 'dotenv-flow';
dotenv.config();

const config = {
  swagger: '2.0',
  info: {
    version: '1.0.0.',
    title: 'DOCTOR APPOINTMENT APIS documentation',
    description: '',
  },
  
  schemes: ['http', 'httpS'],
  securityDefinitions: {
    JWT  : {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  tags: [
    {
      name: 'DOCTOR APPOINTMENT APIS documentation',
    },
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths:{
  "/": {
        "get": {
            "tags": ["home"],
            "summary": "Default message on server",
            "operationId": "",
            "requestBody": {
            "description": "default router should return message",
            "content": {
                "application/json": {
                "schema": {}
                },
                "application/xml": {
                "schema": {}
                }
            },
            "required": false
            },
            "responses": {
            "200": {
                "description": "Message of successful request",
                "content": {}
            }
            },
            "x-codegen-request-body-name": "body"
        }
  },
  "/patient/getAll": {
      "get": {
          "tags": ["admin"],
          "summary": "retrieves all patients from the database",
          "operationId": "",
          "security": [{
            "JWT": [],
          }],
          "requestBody": {
          "description": "default router should return message",
          "content": {
              "application/json": {
              "schema": {}
              },
              "application/xml": {
              "schema": {}
              }
          },
          "required": false
          },
          "responses": {
          "200": {
              "description": "Message of successful request",
              "content": {}
          }
          },
          "x-codegen-request-body-name": "body"
      }
  },
  "/patient/create": {
    "post": {
      "tags": ["users"],
      "summary": "creating a new user",
      "description": "",
      "produces": ["application/json"],
      "parameters": [
        {
          "name": "user information",
          "in": "body",
          "description": "The user's name",
          "required": true,
          "schema": {
            "type": "object",
             "properties":{
              "firstName": {
                "type": "string",
                "example": "yubahwe"
              },
              "lastName": {
                "type": "string",
                "example": "clem"
              },
              "lastName": {
                "type": "string",
                "example": "clem"
              },
              "gender": {
                "type": "string",
                "example": "male"
              },
              "email": {
                "type": "string",
                "example": "shema@gmail.com"
              },
              "phone": {
                "type": "string",
                "example": "078453432343"
              },
              "password": {
                "type": "string",
                "example": "admin12345"
              },
             }
          }
        }
      ],
      "responses": {
        "201": {
          "description": "User created successfully"
        },
        "400": {
          "description": "Incorrect information"
        },
        "403": {
          "description": "Email is already in use"
        }
      }
    },
    "x-codegen-request-body-name": "body"
  },
  "/patient/login": {
    "post": {
      "tags": ["users"],
      "summary": "creating a new user",
      "description": "",
      "security": [{
        "JWT": [],
      }],
      "produces": ["application/json"],
      "parameters": [
        {
          "name": "user information",
          "in": "body",
          "description": "The user's name",
          "required": true,
          "schema": {
            "type": "object",
             "properties":{
              "email": {
                "type": "string",
                "example": "shema@gmail.com"
              },
              "password": {
                "type": "string",
                "example": "admin12345"
              },
             }
          }
        }
      ],
      "responses": {
        "201": {
          "description": "User created successfully"
        },
        "400": {
          "description": "Incorrect information"
        },
        "403": {
          "description": "Email is already in use"
        }
      }
    },
    "x-codegen-request-body-name": "body"
  },
  "/patient/{id}":{
    "get": {
        "tags": ["doctor"],
        "summary": "Default message on server",
        "parameters":[
         {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true,
            "description": "id of article"
          }
        ],
        "operationId": "",
        "security": [{
          "JWT": [],
        }],
        "requestBody": {
        "description": "default router should all articles that were created",
        "content": {
            "application/json": {
            "schema": {}
            },
            "application/xml": {
            "schema": {}
            }
        },
        
        "required": false
        },
        "responses": {
        "403": {
            "description": "message of request when not Logged in ",
            "content": {}
        },
        "200": {
            "description": "Message of successful request",
            "content": {}
        }
        },
        "x-codegen-request-body-name": "body"
    }
  },
  "/patient/delete/{id}":{
    "delete": {
        "tags": ["admin"],
        "summary": "deleting a user",
        "parameters":[
         {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true,
            "description": "id of user"
          }
        ],
        "operationId": "",
        "security": [{
          "JWT": [],
        }],
        "requestBody": {
        "description": "deleting a user from the database",
        "content": {
            "application/json": {
            "schema": {}
            },
            "application/xml": {
            "schema": {}
            }
        },
        
        "required": false
        },
        "responses": {
        "403": {
            "description": "message of request when not Logged in ",
            "content": {}
        },
        "200": {
            "description": "Message of successful request",
            "content": {}
        }
        },
        "x-codegen-request-body-name": "body"
    }
  },
  "/history/create/{id}": {
    "post": {
      "tags": ["users"],
      "summary": "creating a new user",
      "description": "",
      "security": [{
        "JWT": [],
      }],
      "produces": ["application/json"],
      "parameters": [
        {
          "in": "path",
          "name": "id",
          "type": "string",
          "required": true,
          "description": "id of article"
        },
        {
          "name": "user information",
          "in": "body",
          "description": "The user's name",
          "required": true,
          "schema": {
            "type": "object",
             "properties":{
              "HistoryOfIllness": {
                "type": "string",
                "example": "brain tumor"
              },
              "VitalSigns": {
                "type": "string",
                "example": "headaches"
              },
              "PhysicalExamination": {
                "type": "string",
                "example": "x-ray"
              },
              "SurgicalHistory": {
                "type": "string",
                "example": "brain surgery"
              },
              "MedicalAllergies": {
                "type": "string",
                "example": "allergic to morphin"
              },
              "labReports": {
                "type": "string",
                "example": "high quantity of sodium in the body"
              },
              "medicalDrugs": {
                "type": "string",
                "example": "paracetamol"
              },
             }
          }
        }
      ],
      "responses": {
        "201": {
          "description": "history created successfully"
        },
        "400": {
          "description": "Incorrect information"
        },
      }
    },
    "x-codegen-request-body-name": "body"
  },

 
  

  },
};
export default config;