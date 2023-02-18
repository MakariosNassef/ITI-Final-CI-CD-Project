# Create a VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  # Must be enabled for EFS
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = var.main
  }
}

resource "aws_internet_gateway" "igw_main" {
  # The VPC ID to create in.
  vpc_id = aws_vpc.main.id

  
  #A map of tags to assign to the resource.
  tags = {
    Name="igw_main"
  }
}


resource "aws_subnet" "private_us_east_1a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1a"

  tags = {
    "Name"                            = "private-us-east-1a"
    # set to the value "1", which mean that this Elastic Load Balancer is intended for internal use only within the cluster. 
    "kubernetes.io/role/internal-elb" = "1"
    # set to "owned", which indicate that the cluster named "demo" owns this resource.
    "kubernetes.io/cluster/eks"      = "owned"
  }
}

resource "aws_subnet" "private_us_east_1b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1b"

  tags = {
    "Name"                            = "private-us-east-1b"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/eks"      = "owned"
  }
}

resource "aws_subnet" "public_us_east_1a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    "Name"                       = "public-us-east-1a"
    "kubernetes.io/role/elb"     = "1"
    "kubernetes.io/cluster/eks" = "shared"
  }
}

resource "aws_subnet" "public_us_east_1b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    "Name"                       = "public-us-east-1b"
    "kubernetes.io/role/elb"     = "1"
    "kubernetes.io/cluster/eks" = "shared"
  }
}

# used 2 nat to make it high available
resource "aws_eip" "nat1" {
  #EIP may require IGW to exist prior to association .
  #Use depends_on to set an explicit dependency on the IGW.
  depends_on = [aws_internet_gateway.igw_main]
}

resource "aws_eip" "nat2" {
  #EIP may require IGW to exist prior to association .
  #Use depends_on to set an explicit dependency on the IGW.
  depends_on = [aws_internet_gateway.igw_main]
}



resource "aws_nat_gateway" "nat_gw1" {
  allocation_id = aws_eip.nat1.id
  subnet_id     = aws_subnet.public_us_east_1a.id

  tags = {
    Name = "gw NAT1"
  }

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.igw_main]
}

resource "aws_nat_gateway" "nat_gw2" {
  allocation_id = aws_eip.nat2.id
  subnet_id     = aws_subnet.public_us_east_1b.id

  tags = {
    Name = "gw NAT2"
  }

  # To ensure proper ordering, it is recommended to add an explicit dependency
  # on the Internet Gateway for the VPC.
  depends_on = [aws_internet_gateway.igw_main]
}

// i will create 3 route table 2 for private subnet and 1 is public route table 
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw_main.id
  }

  tags = {
    Name = "public_route_table"
  }
}

resource "aws_route_table" "private1_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw1.id
  }

  tags = {
    Name = "private1_route_table"
  }
}

resource "aws_route_table" "private2_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw2.id
  }

  tags = {
    Name = "private2_route_table"
  }
}

resource "aws_route_table_association" "private_route_1a" {
  subnet_id      = aws_subnet.private_us_east_1a.id
  route_table_id = aws_route_table.private1_route_table.id
}

resource "aws_route_table_association" "private_route_1b" {
  subnet_id      = aws_subnet.private_us_east_1b.id
  route_table_id = aws_route_table.private2_route_table.id
}

resource "aws_route_table_association" "public_route_1a" {
  subnet_id      = aws_subnet.public_us_east_1a.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_route_1b" {
  subnet_id      = aws_subnet.public_us_east_1b.id
  route_table_id = aws_route_table.public_route_table.id
}