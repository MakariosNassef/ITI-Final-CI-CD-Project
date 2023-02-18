output "private_us_east_1a_id_output" {
  value = aws_subnet.private_us_east_1a.id
}

output "private_us_east_1b_id_output" {
  value = aws_subnet.private_us_east_1b.id
}

output "public_us_east_1a_id_output" {
  value = aws_subnet.public_us_east_1a.id
}

output "public_us_east_1b_id_output" {
  value = aws_subnet.public_us_east_1b.id
}

output "vpc_id_output" {
  value = aws_vpc.main.id
}
