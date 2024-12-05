import os
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, GPT2LMHeadModel


from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
)

class AgricultureChatbot:
    def __init__(self, model_path):
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(model_path)
            self.model = AutoModelForCausalLM.from_pretrained(model_path)
        except OSError as e:
            print(f"Error loading model and tokenizer: {e}")
            raise e

    def generate_response(self, query, language):
        # Determine the device to use
        if torch.cuda.is_available():
            device = torch.device("cuda")
        else:
            device = torch.device("cpu")

        # Encode the input query
        input_ids = self.tokenizer.encode(query, return_tensors='pt').to(device)

        # Generate the response
        output = self.model.generate(
            input_ids,
            max_length=100,
            num_return_sequences=1,
            pad_token_id=self.tokenizer.eos_token_id,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            num_beams=2,
            device=device
        )

        # Decode the response
        response = self.tokenizer.decode(output[0], skip_special_tokens=True)
        return response

def create_app(model_path='/home/user/Downloads/kerala_agriculture_model/content/kerala-agriculture-multilingual-quick'):
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Load model from local directory
    chatbot = AgricultureChatbot(model_path)

    @app.route('/chat', methods=['POST'])
    def chat_endpoint():
        try:
            data = request.json
            query = data.get('query', '')
            language = data.get('language', 'malayalam')

            # Generate response
            response = chatbot.generate_response(query, language)

            return jsonify({
                'status': 'success',
                'query': query,
                'response': response
            }), 200

        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': str(e)
            }), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
