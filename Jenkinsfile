pipeline {
    agent any

    environment {
        IMAGE_NAME = "akashmaiyar/cicd-nodejs-app"
    }

    stages {

        stage('Branch Info') {
            steps {
                echo "Branch: ${env.BRANCH_NAME}"
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
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@10.0.3.151 '
                        sudo docker pull ${IMAGE_NAME}:${BUILD_NUMBER}

                        sudo docker stop cicd-app || true

                        sudo docker rm cicd-app || true

                        sudo docker run -d \
                            --name cicd-app \
                            -p 3000:3000 \
                            ${IMAGE_NAME}:${BUILD_NUMBER}
                    '
                    """
                }
            }
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
//         stage('Branch Info') {
//     steps {
//         echo "Branch: ${env.BRANCH_NAME}"
//     }
// }
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

//     when {
//         anyOf {
//             branch 'develop'
//             branch 'main'
//         }
//     }

//     steps {
//         sh '''
//         docker push $IMAGE_NAME:$BUILD_NUMBER
//         '''
//     }
// }

//         stage('Deploy') {
//     steps {
//         stage('Deploy') {

//     when {
//         branch 'main'
//     }

//     steps {
//         // deployment logic
//     }
// }


//         sshagent(['app-server-ssh']) {
//             sh """
//             ssh -o StrictHostKeyChecking=no ubuntu@10.0.3.151 '
//                 sudo docker pull ${IMAGE_NAME}:${BUILD_NUMBER}

//                 sudo docker stop cicd-app || true

//                 sudo docker rm cicd-app || true

//                 sudo docker run -d \
//                     --name cicd-app \
//                     -p 3000:3000 \
//                     ${IMAGE_NAME}:${BUILD_NUMBER}
//             '
//             """
//         }
//     }
// }
//     }
// }