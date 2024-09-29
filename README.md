```
PUC-Rio
Especialização em Desenvolvimento Fullstack
Disciplina: Desenvolvimento Back-end Avançado

Aluno: Rodrigo Alves Costa
```

## Market Master: UI
The `mm-ui` service is part of the Market Master project, a suite of microservices designed to manage various aspects of a supermarket e-commerce platform. This service handles the product front-end and its various connections to the microservices and their respective interactions.

### Related Market Master Microservices:
- [mm-product](https://github.com/MarketMasterPlus/mm-product) — Product (item registry) Management
- [mm-store](https://github.com/MarketMasterPlus/mm-store) — Store Management
- [mm-address](https://github.com/MarketMasterPlus/mm-address) — Address Management with ViaCEP API integration
- [mm-customer](https://github.com/MarketMasterPlus/mm-customer) — Customer/User Management
- [mm-shopping-cart](https://github.com/MarketMasterPlus/mm-shopping-cart) — Shopping Cart Management
- [mm-pact-broker](https://github.com/MarketMasterPlus/mm-pact-broker) — Pact Broker for Contract tests
- [mm-ui](https://github.com/MarketMasterPlus/mm-ui) — User Interface for Market Master

## Market Master: Architecture Diagram

![Market Master Architecture](./docs/architecture.png)

This diagram illustrates the relationship between the front-end and the various backend services of the Market Master project.

## Live Demo
You can see a 5-minute live demo of this project here:
    [![Market Master Demo](https://img.youtube.com/vi/1Q1Q1Q1Q1Q1Q/0.jpg)](https://www.youtube.com/watch?v=1Q1Q1Q1Q1Q1Q)
    
## Quick Start

This section provides instructions for quickly setting up the `mm-ui` using Docker Compose.

### Prerequisites
- Docker and Docker Compose installed on your machine.

### Running the Service
To start the `mm-ui` along with its dependent services, follow these steps:

1. Clone the repository if you haven't already:
   git clone https://github.com/MarketMasterPlus/mm-ui
   
2. Navigate to the project directory:
   cd mm-ui
   
3. Start all related services using Docker Compose:
   docker-compose up --build

This will build and start all the services defined in the `docker-compose.yml` file, making the UI accessible at [http://localhost:5702](http://localhost:5702).

## Functionality Overview

The `mm-ui` provides interfaces for:
- **Store Management**: View, add, and manage supermarket stores.
- **Product Management**: Manage products including their inventory, pricing, and category.
- **Customer Management**: Handle customer registrations, profiles, and authentication.
- **Shopping Cart Management**: Manage active shopping carts for logged-in customers.
- **Address Lookup**: Integrate with the ViaCEP API to fetch address details.

## How to Use

After launching the services, you can navigate to the UI through your browser at `http://localhost:5702`. Here you can register as a new user or log in with existing credentials to access the various functionalities. Bear in mind that this UI component is not fully functional without the backend services running.

## Installation and Configuration
After launching the services, you can navigate to the UI through your browser at `http://localhost:5702`. Here you can register as a new user or log in with existing credentials to access the various functionalities. Bear in mind that this UI component is not fully functional without the backend services running.

## Installation and Configuration

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/mm-ui.git
    cd mm-ui
    ```

2. **Create and configure the `.env` file**:
    - In the root directory of the project, create a file named `.env`.
    - Add the necessary environment variables to the `.env` file. Below is an example configuration:
        ```env
VITE_MM_CUSTOMER_API_URL=http://localhost:5701
VITE_MM_ADDRESS_API_URL=http://localhost:5700
VITE_MM_STORE_API_URL=http://localhost:5703
VITE_MM_PRODUCT_API_URL=http://localhost:5704
VITE_MM_INVENTORY_API_URL=http://localhost:5705
        ```
    - You can rename the .env.example file to .env and update the values as needed.
    ```sh
    cp .env.example .env
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Start the development server**:
    ```sh
    npm run dev
    ```

5. **Build the project for production**:
    ```sh
    npm run build
    ```

6. **Run with Docker**:
    - Ensure Docker is installed and running on your machine.
    - Build and start the services using Docker Compose:
        ```sh
        docker-compose up --build
        ```

## Contributing

Contributions to the `mm-ui` project are welcome. Please ensure to follow the existing coding standards and submit pull requests for any new features or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Additional Information

For more details on the individual microservices or to report issues, please refer to the respective repositories or open issues in this repository.
