module "network_module" {
  source = "./network"
  main = "main-vpc"

  # management-subnet-name = "management-subnet"
  # restricted-subnet-name = "restricted-subnet"
}

module "cluster_module" {
  source = "./cluster"
  private_us_east_1a_id = module.network_module.private_us_east_1a_id_output
  private_us_east_1b_id = module.network_module.private_us_east_1b_id_output
  public_us_east_1a_id = module.network_module.public_us_east_1a_id_output
  public_us_east_1b_id = module.network_module.public_us_east_1b_id_output
  vpc_id = module.network_module.vpc_id_output
}

