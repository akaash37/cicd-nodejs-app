pipeline {
    agent any

    environment {
        IMAGE_NAME = "akashmaiyar/cicd-nodejs-app"
<<<<<<< HEAD
        APP_SERVER = "10.0.3.151"
=======
>>>>>>> feature/login
    }

    stages {

<<<<<<< HEAD
        stage('Branch Info') {
            steps {
                echo "Building Branch: ${env.BRANCH_NAME}"
                echo "Build Number: ${BUILD_NUMBER}"
=======
        stage('Checkout') {
            steps {
                checkout scm
>>>>>>> feature/login
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
<<<<<<< HEAD
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
=======
>>>>>>> feature/login
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

<<<<<<< HEAD
        stage('Push Docker Image') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
=======
        stage('Push Image') {
>>>>>>> feature/login
            steps {
                sh '''
                docker push $IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }
<<<<<<< HEAD

        stage('Deploy to App Server') {
            when {
                branch 'main'
            }

            steps {

                sshagent(['app-server-ssh']) {

                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${APP_SERVER} '
                        sudo docker pull ${IMAGE_NAME}:${BUILD_NUMBER}

                        sudo docker stop cicd-app || true

                        sudo docker rm cicd-app || true

                        sudo docker run -d \
                            --name cicd-app \
                            -p 3000:3000 \
                            --restart unless-stopped \
                            ${IMAGE_NAME}:${BUILD_NUMBER}
                    '
                    """
                }
            }
        }

        stage('Health Check') {
            when {
                branch 'main'
            }

            steps {

                sshagent(['app-server-ssh']) {

                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${APP_SERVER} '
                        sleep 10
                        curl -f http://localhost:3000
                    '
                    """
                }
            }
        }
    }

    post {

        success {
            echo "Pipeline completed successfully"
        }

        failure {
            echo "Pipeline failed"
        }
    }
}
// pipeline {
//     agent any

//     environment {
//         IMAGE_NAME = "akashmaiyar/cicd-nodejs-app"
//     }

//     stages {

//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 sh '''
//                 docker build -t $IMAGE_NAME:$BUILD_NUMBER .
//                 '''
//             }
//         }

//         stage('Docker Login') {
//             steps {
//                 withCredentials([
//                     usernamePassword(
//                         credentialsId: 'dockerhub-creds',
//                         usernameVariable: 'DOCKER_USER',
//                         passwordVariable: 'DOCKER_PASS'
//                     )
//                 ]) {
//                     sh '''
//                     echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
//                     '''
//                 }
//             }
//         }

//         stage('Push Image') {
//             steps {
//                 sh '''
//                 docker push $IMAGE_NAME:$BUILD_NUMBER
//                 '''
//             }
//         }
//     }
// }
=======
    }
}
>>>>>>> feature/login
