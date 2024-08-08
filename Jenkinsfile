/* Requires the Docker Pipeline plugins */
pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 14', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                script {
                    def gitCreds = credentials('github-token-1')
                    git url: 'https://github.com/ims7inc/pokemon-grid.git', credentialsId: 'github-token-1'
                }
            }
        }


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