#!/usr/bin/env python3
"""
Mock API Server for Ayome Project
This server simulates the backend API responses
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from urllib.parse import urlparse, parse_qs
import time

class MockAPIHandler(BaseHTTPRequestHandler):
    
    def _set_headers(self, status=200, content_type='application/json'):
        self.send_response(status)
        self.send_header('Content-Type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, token, Authorization')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.end_headers()
    
    def do_OPTIONS(self):
        """Handle preflight CORS requests"""
        self._set_headers()
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        print(f"📥 GET {path}")
        
        # Mock responses for different endpoints
        mock_data = self.get_mock_data(path)
        
        self._set_headers()
        self.wfile.write(json.dumps(mock_data).encode())
    
    def do_POST(self):
        """Handle POST requests"""
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        print(f"📤 POST {path}")
        
        try:
            request_data = json.loads(post_data) if post_data else {}
            print(f"   Data: {request_data}")
        except:
            request_data = {}
        
        mock_data = self.get_mock_data(path, request_data)
        
        self._set_headers()
        self.wfile.write(json.dumps(mock_data).encode())
    
    def get_mock_data(self, path, post_data=None):
        """Return mock data based on the endpoint"""
        
        # Default success response
        default_response = {
            "code": 200,
            "msg": "success",
            "data": {},
            "timestamp": int(time.time())
        }
        
        # User/Auth endpoints
        if 'user' in path or 'login' in path or 'auth' in path:
            return {
                "code": 200,
                "msg": "success",
                "data": {
                    "userId": "12345",
                    "username": "TestUser",
                    "token": "mock_token_123456789",
                    "avatar": "",
                    "level": 10,
                    "exp": 5000,
                    "gold": 10000,
                    "diamonds": 500,
                    "lang": "en_US"
                }
            }
        
        # CP (Couple) data
        if 'cp' in path.lower():
            return {
                "code": 200,
                "msg": "success",
                "data": {
                    "cpLevel": 5,
                    "cpExp": 2500,
                    "cpName": "Sweet Couple",
                    "partner": {
                        "userId": "67890",
                        "username": "Partner",
                        "avatar": "",
                        "level": 8
                    },
                    "rewards": [
                        {
                            "id": 1,
                            "name": "Frame",
                            "icon": "",
                            "unlocked": True
                        },
                        {
                            "id": 2,
                            "name": "Badge",
                            "icon": "",
                            "unlocked": False
                        }
                    ],
                    "ranking": {
                        "daily": 15,
                        "weekly": 8,
                        "monthly": 25
                    }
                }
            }
        
        # Ranking/Leaderboard
        if 'rank' in path or 'leaderboard' in path:
            return {
                "code": 200,
                "msg": "success",
                "data": {
                    "list": [
                        {
                            "rank": 1,
                            "userId": "111",
                            "username": "TopPlayer1",
                            "avatar": "",
                            "score": 99999,
                            "level": 50
                        },
                        {
                            "rank": 2,
                            "userId": "222",
                            "username": "TopPlayer2",
                            "avatar": "",
                            "score": 88888,
                            "level": 45
                        },
                        {
                            "rank": 3,
                            "userId": "333",
                            "username": "TopPlayer3",
                            "avatar": "",
                            "score": 77777,
                            "level": 40
                        }
                    ],
                    "myRank": 15,
                    "myScore": 5000
                }
            }
        
        # Gift/Reward data
        if 'gift' in path or 'reward' in path:
            return {
                "code": 200,
                "msg": "success",
                "data": {
                    "gifts": [
                        {
                            "id": 1,
                            "name": "Rose",
                            "icon": "",
                            "price": 10,
                            "type": "normal"
                        },
                        {
                            "id": 2,
                            "name": "Diamond Ring",
                            "icon": "",
                            "price": 999,
                            "type": "special"
                        }
                    ]
                }
            }
        
        # Config/Settings
        if 'config' in path or 'setting' in path:
            return {
                "code": 200,
                "msg": "success",
                "data": {
                    "version": "1.0.0",
                    "languages": ["en_US", "ar_SA", "tr_TR", "zh_CN"],
                    "features": {
                        "cp": True,
                        "ranking": True,
                        "gifts": True
                    }
                }
            }
        
        # Default response for unknown endpoints
        return default_response
    
    def log_message(self, format, *args):
        """Custom log format"""
        return  # Suppress default logging

def run_server(port=3000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, MockAPIHandler)
    
    print("=" * 60)
    print("🚀 Mock API Server Started!")
    print("=" * 60)
    print(f"📍 Server running on: http://localhost:{port}")
    print(f"🌐 CORS enabled for all origins")
    print(f"📝 Simulating API endpoints from: https://app.ayomet.com/")
    print("=" * 60)
    print("📋 Available Mock Endpoints:")
    print("   - /user/* (User data)")
    print("   - /cp/* (Couple data)")
    print("   - /rank/* (Rankings)")
    print("   - /gift/* (Gifts)")
    print("   - /config/* (Configuration)")
    print("=" * 60)
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    print()
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped")
        httpd.server_close()

if __name__ == '__main__':
    run_server(3000)
