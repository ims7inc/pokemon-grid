/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'node:18.20.0-alpine3.20' } }
    stages {
        stage('check') {
            steps {
                sh 'node --version'
            }
        },
        stage('install') {
            steps {
                sh 'npm install'
            }
        },
        stage('build') {
            steps {
                sh 'npm build'
            }
        }
    }
}