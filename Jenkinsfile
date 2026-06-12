pipeline {
    agent any

    environment {
        IMAGE_NAME = "akashmaiyar/cicd-nodejs-app"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$BUILD_NUMBER .
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }

        stage('Deploy') {

    steps {

        sshagent(['app-server-ssh']) {

            sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@10.0.3.151 '

            docker pull akashmaiyar/cicd-nodejs-app:${BUILD_NUMBER}

            docker stop cicd-app || true

            docker rm cicd-app || true

            docker run -d \
            --name cicd-app \
            -p 3000:3000 \
            akashmaiyar/cicd-nodejs-app:${BUILD_NUMBER}

            '
            '''
        }
    }
}
    }
}