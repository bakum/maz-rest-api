module.exports = {
    "port": 3600,
    "portSSL": 3601,
    "proxy" : {
        "use": true,
        "port": 80,
        "proxyEndpoint" : "http://localhost"
    },
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "media_location": "media",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    },
    "mysql": {
        "host" : "localhost",
        "database" : "mazua00_db",
        "username" : "mazua00_db",
        "password" : "mazua00_db"
    },
    "production": {
        "useSSL": true
    },
    "api": {
        "uri" : "/api/v2/"
    }
};
