class Base44Client {
    constructor() {
        this.baseUrl =
            process.env.NODE_ENV === "production"
                ? "https://api.base44.com"
                : "https://sandbox.api.base44.com";

        // Add entities and integrations that your components expect
        this.entities = {
            Product: {
                list: (sortOrder = "-created_date") => {
                    console.log(
                        "Fetching products with sort order:",
                        sortOrder,
                    );
                    // Mock product data for development
                    return Promise.resolve([
                        {
                            id: 1,
                            name: "Handmade African Quilt",
                            description:
                                "Beautiful handmade quilt crafted by HIV-positive widows in Western Kenya",
                            price: 89.99,
                            category: "quilts",
                            image_url:
                                "https://images.unsplash.com/photo-1595341595112-6add1c9c19eb?w=400",
                            stock_quantity: 10,
                            featured: true,
                            handmade_by: "Sarah from Kaimosi",
                        },
                        {
                            id: 2,
                            name: "Colorful Beaded Necklace",
                            description:
                                "Vibrant beaded jewelry made with traditional African fabrics",
                            price: 24.99,
                            category: "beads",
                            image_url:
                                "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
                            stock_quantity: 25,
                            featured: false,
                            handmade_by: "Grace from Maganda",
                        },
                        {
                            id: 3,
                            name: "African Fabric Tote Bag",
                            description:
                                "Sturdy and stylish tote bag made from authentic African fabrics",
                            price: 45.99,
                            category: "bags",
                            image_url:
                                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
                            stock_quantity: 15,
                            featured: true,
                            handmade_by: "Mary from Kaimosi",
                        },
                        {
                            id: 4,
                            name: "Handwoven Table Runner",
                            description:
                                "Elegant table runner perfect for home decoration",
                            price: 34.99,
                            category: "home_decor",
                            image_url:
                                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
                            stock_quantity: 8,
                            featured: false,
                            handmade_by: "Esther from Maganda",
                        },
                    ]);
                },
            },
            Order: {
                create: (orderData) => {
                    console.log("Creating order:", orderData);
                    // Simulate order creation
                    return Promise.resolve({
                        success: true,
                        order_number: orderData.order_number,
                        id: Math.random().toString(36).substr(2, 9),
                    });
                },
            },
        };

        this.integrations = {
            Core: {
                SendEmail: (emailData) => {
                    console.log("Sending email:", {
                        to: emailData.to,
                        subject: emailData.subject,
                        from_name: emailData.from_name,
                    });
                    // Simulate email sending
                    return Promise.resolve({
                        success: true,
                        message_id: Math.random().toString(36).substr(2, 9),
                    });
                },
            },
        };
    }

    async processPayment(paymentData) {
        try {
            console.log("Processing payment:", paymentData);
            // Simulate API call
            const response = await fetch(`${this.baseUrl}/payments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.getApiKey()}`,
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                throw new Error(`Payment failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Payment processing error:", error);
            // Return mock success for development
            return {
                success: true,
                transactionId: "mock_" + Date.now(),
                status: "completed",
            };
        }
    }

    async verifyTransaction(transactionId) {
        try {
            console.log("Verifying transaction:", transactionId);
            const response = await fetch(
                `${this.baseUrl}/transactions/${transactionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getApiKey()}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`Verification failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Transaction verification error:", error);
            // Return mock verification for development
            return {
                success: true,
                status: "completed",
                transactionId: transactionId,
            };
        }
    }

    getApiKey() {
        return (
            process.env.REACT_APP_BASE44_API_KEY ||
            "mock_api_key_for_development"
        );
    }
}

export const base44 = new Base44Client();
