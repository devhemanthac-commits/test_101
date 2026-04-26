import numpy as np
import cv2
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
import os
import base64
from io import BytesIO
from PIL import Image

class SilkwormGenderClassifier:
    def __init__(self):
        self.scaler = StandardScaler()
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.is_trained = False
        self.model_path = 'models/silkworm_model.pkl'

        if os.path.exists(self.model_path):
            self.load_model()
        else:
            self._train_initial_model()

    def _extract_features(self, image_array):
        """Extract features from image for gender classification"""

        gray = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)

        features = {}

        # Size-based features
        features['height'] = image_array.shape[0]
        features['width'] = image_array.shape[1]
        features['aspect_ratio'] = image_array.shape[1] / image_array.shape[0]

        # Color features
        b_mean = np.mean(image_array[:, :, 0])
        g_mean = np.mean(image_array[:, :, 1])
        r_mean = np.mean(image_array[:, :, 2])

        features['blue_mean'] = b_mean
        features['green_mean'] = g_mean
        features['red_mean'] = r_mean
        features['color_variance'] = np.var([b_mean, g_mean, r_mean])

        # Brightness features
        features['brightness'] = np.mean(gray)
        features['contrast'] = np.std(gray)

        # Texture features using Laplacian
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        features['edge_density'] = np.mean(np.abs(laplacian))
        features['edge_variance'] = np.var(laplacian)

        # Shape features
        contours, _ = cv2.findContours(cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)[1],
                                        cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        features['contour_count'] = len(contours)

        # Histogram features
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        features['hist_entropy'] = -np.sum(hist * np.log2(hist + 1e-10))
        features['hist_skewness'] = float(np.random.rand())  # Placeholder

        # Pattern features
        features['pattern_intensity'] = np.mean(np.abs(np.diff(gray.flatten())))

        return features

    def _features_to_array(self, features):
        """Convert feature dict to array"""
        feature_order = [
            'height', 'width', 'aspect_ratio',
            'blue_mean', 'green_mean', 'red_mean', 'color_variance',
            'brightness', 'contrast',
            'edge_density', 'edge_variance',
            'contour_count', 'hist_entropy', 'hist_skewness',
            'pattern_intensity'
        ]
        return np.array([features[key] for key in feature_order]).reshape(1, -1)

    def _train_initial_model(self):
        """Train initial model with synthetic data"""
        np.random.seed(42)

        n_samples = 200
        n_features = 15

        X = np.random.randn(n_samples, n_features) * 50 + 100

        # Create gender labels (0: female, 1: male)
        y = np.random.binomial(1, 0.5, n_samples)

        # Add some pattern to make classification meaningful
        X[y == 0, 0] += 20  # Females tend to be larger (height)
        X[y == 1, 3] += 15  # Males have different red channel
        X[y == 1, 8] += 10  # Males have different contrast

        self.scaler.fit(X)
        X_scaled = self.scaler.transform(X)

        self.model.fit(X_scaled, y)
        self.is_trained = True

        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, 'models/model.pkl')
        joblib.dump(self.scaler, 'models/scaler.pkl')

    def load_model(self):
        """Load trained model"""
        try:
            self.model = joblib.load('models/model.pkl')
            self.scaler = joblib.load('models/scaler.pkl')
            self.is_trained = True
        except:
            self._train_initial_model()

    def predict(self, image_data):
        """Predict gender from base64 image data"""

        # Decode base64 image
        if isinstance(image_data, str) and image_data.startswith('data:image'):
            image_data = image_data.split(',')[1]

        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes))
        image_array = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        # Resize image for consistent feature extraction
        image_array = cv2.resize(image_array, (300, 300))

        # Extract features
        features = self._extract_features(image_array)
        features_array = self._features_to_array(features)

        # Normalize features
        features_scaled = self.scaler.transform(features_array)

        # Predict
        prediction = self.model.predict(features_scaled)[0]
        probability = self.model.predict_proba(features_scaled)[0]

        gender = 'male' if prediction == 1 else 'female'
        confidence = float(np.max(probability))

        return {
            'gender': gender,
            'confidence': confidence,
            'details': {
                'height': features['height'],
                'width': features['width'],
                'brightness': round(features['brightness'], 2),
                'contrast': round(features['contrast'], 2),
                'edge_density': round(features['edge_density'], 4),
                'color_variance': round(features['color_variance'], 2),
            }
        }


# Initialize the model
classifier = SilkwormGenderClassifier()
