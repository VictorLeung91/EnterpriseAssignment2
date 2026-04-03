pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            agent {
                docker {
                    image 'node:22'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:22'
                    reuseNode true
                }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:22'
                    reuseNode true
                }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:22'
                    reuseNode true
                }
            }
            environment {
                NETLIFY_CLI_VERSION = '17.38.0'
            }
            steps {
                withCredentials([
                    string(credentialsId: 'netlify-site-id', variable: 'NETLIFY_SITE_ID'),
                    string(credentialsId: 'netlify-auth-token', variable: 'NETLIFY_AUTH_TOKEN')
                ]) {
                    sh 'npx netlify-cli@$NETLIFY_CLI_VERSION deploy --prod --dir=dist'
                }
            }
        }
    }
}
