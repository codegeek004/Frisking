# Frisking

# Prerequisites

1. **Python**: Ensure that you have Python3.8+ installed on your system. You can download it from [python.org](https://www.python.org).

2. **Virtual Environment**: Isolate your project in a virtual environment where no mismatch of versions and libraries from your local machine occurs.

## Installation Steps

### 1. Clone the repository
```bash
    git clone git@github.com:codegeek004/Frisking.git
    cd ParkEasy
```

### 2. Setup the virtual environment
```bash
    python -m venv venv
    source venv/bin/activate    # On macOS/Linux
    venv\Scripts\activate       # On Windows
```

### 3. Install the requirements
Install all the python packages from requirements.txt
```bash
    pip install -r requirements.txt
```

### 4. Run the files

#### For detecting person
Run the command
```bash
    python detect_people.py
```

#### For detecting the gender
Run the command
```bash
    python gender_detection.py
```
