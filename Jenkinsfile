pipeline {
    agent any
    tools {
        nodejs "Nodejs-24.7.0"
    }
    // Token & host are injected by withSonarQubeEnv; no need to declare credentials here.

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

        stage('SonarQube Connectivity') {
            steps {
                withSonarQubeEnv('sonarqube-25.8.0') {
                    sh '''
                      echo "Checking SonarQube server status at $SONAR_HOST_URL";
                      curl -s -o /dev/null -w '%{http_code}\n' "$SONAR_HOST_URL/api/system/status" || true
                    '''
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube-25.8.0') {
                    // Do not override sonar.host.url; plugin supplies correct URL & token.
                    sh 'npx sonar-scanner -Dsonar.projectKey=jenkins-sonarqube -Dsonar.sources=.'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') { // allow more time for CE task
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
