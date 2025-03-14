from flask import Flask, request, jsonify
from flask_cors import CORS 
import jwt  # type: ignore
import datetime
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


SECRET_KEY = "your_secret_key"


STATIC_USERNAME = "alan"
STATIC_PASSWORD = "123ala123"


model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Backend!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and Password are required"}), 400

    if username == STATIC_USERNAME and password == STATIC_PASSWORD:
        # Generate JWT token
        token = jwt.encode({"username": username, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, SECRET_KEY, algorithm="HS256")
        return jsonify({"message": "Login successful", "accessToken": token}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401


@app.route('/get-ai-response', methods=['POST'])
def get_ai_response():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"message": "Input message is required"}), 400

    inputs = tokenizer(user_message, return_tensors="pt")

    with torch.no_grad():
        outputs = model.generate(inputs['input_ids'], max_length=100, num_return_sequences=1)
    
    ai_response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return jsonify({"response": ai_response})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
