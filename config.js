// Ghost Configuration for Heroku

var path = require('path'),
    config,
    fileStorage,
    storage;

if (!!process.env.S3_ACCESS_KEY_ID) {
  fileStorage = true
  storage = {
    active: 'ghost-s3',
    'ghost-s3': {
      accessKeyId:     process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
      bucket:          process.env.S3_BUCKET_NAME,
      region:          process.env.S3_BUCKET_REGION,
      assetHost:       process.env.S3_ASSET_HOST_URL
    }
  }
} else if (!!process.env.BUCKETEER_AWS_ACCESS_KEY_ID) {
  fileStorage = true
  storage = {
    active: 'ghost-s3',
    'ghost-s3': {
      accessKeyId:     process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
      bucket:          process.env.BUCKETEER_BUCKET_NAME,
      region:          process.env.S3_BUCKET_REGION,
      assetHost:       process.env.S3_ASSET_HOST_URL
    }
  }
} else {
  fileStorage = false
  storage = {}
}

config = {

  // Production (Heroku)
  production: {
    url: process.env.APP_URL,
    mail: {
      transport: 'SMTP',
      options: {
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_ADDRESS,
          pass: process.env.GMAIL_PASSWORD
        }
      }
    },
    fileStorage: fileStorage,
    storage: storage,
    database: {
      client: 'mysql',
      connection: {
        host:     process.env.MYSQL_HOST,
        user:     process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DATABASE,
        charset:  'utf8'
      },
      debug: false
    },
    server: {
      host: '0.0.0.0',
      port: 3000
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
    }
  },

  // Development
  development: {
    url: 'http://localhost:2368',
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost-dev.db')
      },
      debug: false
    },
    server: {
      host: '127.0.0.1',
      port: '2368'
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
    }
  }

};

// Export config
module.exports = config;
