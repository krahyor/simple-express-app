pipeline {
    agent any
    tools {
        nodejs "Nodejs-24.7.0"
    }
    // Credentials are injected automatically by withSonarQubeEnv('SonarQube').
    // If you need manual token access (not recommended), reintroduce:
    // environment { SONAR_TOKEN = credentials('sonarqube-token') }

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
                withSonarQubeEnv('SonarQube') {
                    // sonar-project.properties can hold most settings; specify key/sources if empty.
                    sh 'npx sonar-scanner -Dsonar.projectKey=mywebapp -Dsonar.sources=.'
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
