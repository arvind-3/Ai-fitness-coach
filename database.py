from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import os
from dotenv import load_dotenv

load_dotenv()

class MongoDB:
    def __init__(self):
        self.client = None
        self.db = None
        self.connect()

    def connect(self):
        try:
            self.client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
            self.db = self.client['health_app']
            # Create collections with validation if they don't exist
            self.init_collections()
            print("Connected to MongoDB successfully")
        except ConnectionFailure as e:
            print(f"Failed to connect to MongoDB: {e}")

    def init_collections(self):
        # Users collection
        if 'users' not in self.db.list_collection_names():
            self.db.create_collection('users', validator={
                '$jsonSchema': {
                    'bsonType': 'object',
                    'required': ['username', 'password', 'email'],
                    'properties': {
                        'username': {'bsonType': 'string'},
                        'password': {'bsonType': 'string'},
                        'email': {'bsonType': 'string'},
                        'age': {'bsonType': 'int'}
                    }
                }
            })

        # Moods collection
        if 'moods' not in self.db.list_collection_names():
            self.db.create_collection('moods', validator={
                '$jsonSchema': {
                    'bsonType': 'object',
                    'required': ['username', 'mood', 'date'],
                    'properties': {
                        'username': {'bsonType': 'string'},
                        'mood': {'bsonType': 'string'},
                        'date': {'bsonType': 'string'}
                    }
                }
            })

        # Feedback collection
        if 'feedback' not in self.db.list_collection_names():
            self.db.create_collection('feedback', validator={
                '$jsonSchema': {
                    'bsonType': 'object',
                    'required': ['username', 'rating'],
                    'properties': {
                        'username': {'bsonType': 'string'},
                        'rating': {'bsonType': 'int'},
                        'message': {'bsonType': 'string'}
                    }
                }
            })

    def get_db(self):
        return self.db

# Singleton instance
db_instance = MongoDB()
