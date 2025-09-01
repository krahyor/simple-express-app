pipeline {
    agent any
    tools {
        nodejs "Nodejs-24.7.0"
    }
    environment {
        SONARQUBE = credentials('sonarqube-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'lab', url: 'https://github.com/krahyor/simple-express-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube-25.8.0') {
                sh 'npx sonar-scanner -Dsonar.projectKey=mywebapp -Dsonar.host.url=http://sonarqube:9000'
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
