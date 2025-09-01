pipeline {

    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'lab', url: 'https://github.com/krahyor/simple-express-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'apt update'
                sh 'apt install npm'
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        withSonarQubeEnv('SonarQube') {
                            sh 'npx sonar-scanner -Dsonar.projectKey=mywebapp -Dsonar.login=$SONAR_TOKEN'
                        }
                    }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
