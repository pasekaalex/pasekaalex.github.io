from flask import Flask, render_template, request

app = Flask(__name__, template_folder='templates')

import itertools
import time

characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
sequence_length = 10

def brute_force(target_sequence):
    start_time = time.time()

    for length in range(1, sequence_length + 1):
        combinations = itertools.product(characters, repeat=length)
        for combination in combinations:
            password = ''.join(combination)
            if password == target_sequence:
                end_time = time.time()
                elapsed_time = end_time - start_time
                return elapsed_time

    end_time = time.time()
    elapsed_time = end_time - start_time
    return elapsed_time

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate():
    password = request.form['password']
    elapsed_time = brute_force(password)
    return render_template('result.html', password=password, elapsed_time=elapsed_time)

if __name__ == '__main__':
    app.run(debug=True)
