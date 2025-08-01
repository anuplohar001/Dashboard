import { BarChart3, LineChart } from 'lucide-react';


import { Activity, ArrowRight, BarChart2, Package, PieChart, TrendingUp, Users } from 'react-feather';
import './home.css'
import { Link } from 'react-router-dom';

const HomePage = () => {
    const navigationCards = [
        {
            id: 'topmanagement',
            title: 'Top Management',
            description: 'Executive dashboards, KPIs, and strategic analytics',
            icon: Users,
            color: 'primary',
            stats: ['Revenue Analytics', 'Performance Metrics', 'Strategic Insights'],
            path: '/topmanagement'
        },
        {
            id: 'productmanagement',
            title: 'Product Management',
            description: 'Product analytics, inventory tracking, and market insights',
            icon: Package,
            color: 'success',
            stats: ['Product Analytics', 'Inventory Tracking', 'Market Trends'],
            path: '/productmanagement'
        },
        {
            id: 'salesmanagement',
            title: 'Sales Management',
            description: 'Product analytics, inventory tracking, and market insights',
            icon: Package,
            color: 'success',
            stats: ['Product Analytics', 'Inventory Tracking', 'Market Trends'],
            path: '/salesmanagement'
        },
        {
            id: 'purchasemanagement',
            title: 'Purchase Management',
            description: 'Product analytics, inventory tracking, and market insights',
            icon: Package,
            color: 'success',
            stats: ['Product Analytics', 'Inventory Tracking', 'Market Trends'],
            path: '/purchasemanagement'
        },
        {
            id: 'maintenancehead',
            title: 'Maintenance Head Management',
            description: 'Maintain analytics, inventory maintenance, and market insights',
            icon: Package,
            color: 'success',
            stats: ['Maintain Analytics', 'Inventory Maintenance', 'Market Trends'],
            path: '/maintenancehead'
        }
    ];

    const quickStats = [
        { label: 'Active Users', value: '24,891', change: '+12%', icon: Activity },
        { label: 'Revenue', value: '₹847K', change: '+8.2%', icon: TrendingUp },
        { label: 'Products', value: '1,249', change: '+3.1%', icon: Package },
        { label: 'Analytics', value: '156', change: '+24%', icon: BarChart2 }
    ];

    return (
        <>
            {/* Bootstrap CSS */}
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
                rel="stylesheet"
            />

            <div className=" animated-bg" style={{ backgroundColor:"#e3e5e8"}}>
                <div className="position-relative" style={{ zIndex: 10 }}>
                    {/* Header */}
                    <header className="px-4 py-5">
                        <div className="container-fluid">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h1 className="display-4 fw-bold gradient-text mb-2">
                                        Analytics Dashboard
                                    </h1>
                                    <p className="">Comprehensive business intelligence platform</p>
                                </div>
                                <div className="d-flex gap-3">
                                    <PieChart className="text-primary" size={32} />
                                    <LineChart className="text-info" size={32} />
                                    <BarChart2 className="text-success" size={32} />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Quick Stats */}
                    <section className="px-4 mb-5">
                        <div className="container-fluid">
                            <div className="row g-4">
                                {quickStats.map((stat, index) => (
                                    <div key={index} className="col-12 col-md-6 col-lg-3">
                                        <div className="glass-card rounded-3 p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <stat.icon className="text-info" size={32} />
                                                <span className="text-success fw-medium small">{stat.change}</span>
                                            </div>
                                            <h3 className="h2 fw-bold  mb-1">{stat.value}</h3>
                                            <p className=" small mb-0">{stat.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Main Navigation Cards */}
                    <section className="px-4 mb-5">
                        <div className="container-fluid">
                            <h2 className="h2 fw-bold  mb-4">Choose Your Dashboard</h2>
                            <div className="row g-4">
                                {navigationCards.map((card) => (
                                    <div key={card.id} className=" col-lg-6 border-2">
                                        <div className={`nav-card ${card.color} rounded-3 p-4`}>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className={`icon-gradient ${card.color}`}>
                                                    <card.icon className="" size={24} />
                                                </div>
                                                <ArrowRight className=" arrow-icon" size={24} />
                                            </div>

                                            <h3 className="h3 fw-bold  mb-3">{card.title}</h3>
                                            <p className=" mb-4">{card.description}</p>

                                            <div className="mb-4">
                                                {card.stats.map((stat, index) => (
                                                    <div key={index} className="d-flex align-items-center  small mb-2">
                                                        <div className="stat-dot"></div>
                                                        {stat}
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                to={card.path}
                                                className={`btn btn-gradient ${card.color}  w-100 py-2 z-2`}
                                            >
                                                Access Dashboard
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="px-4 py-5">
                        <div className="container-fluid">
                            <div className="text-center mb-5">
                                <h2 className="h2 fw-bold  mb-3">Powerful Analytics Features</h2>
                                <p className=" mx-auto" style={{ maxWidth: '600px' }}>
                                    Comprehensive tools to analyze, visualize, and understand your business data
                                </p>
                            </div>

                            <div className="row g-4">
                                {[
                                    {
                                        icon: BarChart3,
                                        title: 'Interactive Charts',
                                        description: 'Dynamic visualizations with real-time data updates'
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: 'Trend Analysis',
                                        description: 'Identify patterns and forecast future performance'
                                    },
                                    {
                                        icon: Activity,
                                        title: 'Real-time Monitoring',
                                        description: 'Live data streams and instant notifications'
                                    }
                                ].map((feature, index) => (
                                    <div key={index} className="col-12 col-md-4 text-center">
                                        <div className="feature-icon">
                                            <feature.icon className="" size={32} />
                                        </div>
                                        <h3 className="h4 fw-semibold  mb-2">{feature.title}</h3>
                                        <p className="">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="px-4 py-4 border-top border-secondary border-opacity-25">
                        <div className="container-fluid text-center">
                            <p className=" mb-0">
                                © 2025 Analytics Dashboard. Built with React and Bootstrap.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default HomePage;