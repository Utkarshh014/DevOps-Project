terraform {
  backend "s3" {
    bucket = "utkarsh-devops-tf-state-12345"
    key    = "devops-prj/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}
