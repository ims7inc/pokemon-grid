/* Requires the Docker Pipeline plugins */
pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 18', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('check') {
            steps {
                sh 'node --version'
            }
        }

        stage('install') {
            steps {
                sh 'npm install'
            }
        }

        stage('build') {
            steps {
                sh 'npm build'
            }
        }
    }
}