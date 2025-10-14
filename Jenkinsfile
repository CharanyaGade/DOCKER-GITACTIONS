pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('itemreactapp') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\itemreactapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\itemreactapi"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\itemreactapi"
                xcopy /E /I /Y "ProjectReact\\dist\\*" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\itemreactapi\\"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('ItemSpringBootApp') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootItemapi.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootItemapi.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootItemapi" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootItemapi"
                )
                copy "ProjectSpringBoot\\target\\springbootItemapi.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\springbootItemapi.war"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
