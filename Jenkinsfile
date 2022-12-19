pipeline {
  agent any
   environment {
    DOCKER_TAG = "${BUILD_NUMBER}"
   }
   stages {
       stage('Clean Packages'){
         steps{
          sh 'npm prune'
         }
       }
        stage('INSTALL PACKAGES !') {
            steps{

             sh 'npm install'
             sh 'npm install @angular/cli -g'
            }
        }
         stage('Project Build prod') {
           steps {
             sh 'npm run build:prod'
           }
        }
        stage("Docker build Project"){
           steps{
            sh 'docker version'
            sh 'docker build -t web-angular .'
            sh 'docker image list'
            sh 'docker tag web-angular valere1991/web-angular:${DOCKER_TAG}'
            }
        }
        stage("Docker login"){
           steps {
               withCredentials([usernamePassword(credentialsId: 'Dockerhub-Val', passwordVariable: 'password', usernameVariable: 'username')]) {
               sh 'docker login -u $username -p $password'
               }
           }
        }
        stage("Push Image to Docker Hub"){
            steps{
            sh 'docker push  valere1991/web-angular:${DOCKER_TAG}'
            }
        }

        stage("remove unused docker image"){
              steps{
              sh 'docker rmi web-angular -f'
              sh 'docker rmi valere1991/web-angular:${DOCKER_TAG} -f'
           }
         }

    }
}
