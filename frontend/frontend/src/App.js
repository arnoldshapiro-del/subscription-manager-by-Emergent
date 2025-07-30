

import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Predefined services with categories
const PREDEFINED_SERVICES = {
  'Streaming Services': [
    'Netflix', 'Amazon Prime Video', 'Hulu', 'Apple TV+', 'BritBox', 
    'Disney+', 'HBO Max', 'Paramount+', 'YouTube TV', 'Peacock'
  ],
  'AI Platforms': [
    'ChatGPT', 'Google Gemini', 'Perplexity', 'Claude', 'Emergent', 
    'Bubble', 'Loveable', 'Bolt', 'GitHub', 'Supabase', 'Abacus AI', 
    'Genspark', 'Manis AI', 'Minimax', 'Grok', 'Context', 'Higgsfield'
  ],
  'Other Services': [
    'Spotify', 'NY Times', 'Wall Street Journal', 'Microsoft 365', 
    'Adobe Creative Suite', 'Canva Pro', 'Dropbox', 'iCloud'
  ]
};

// Documentation content
const DOCUMENTATION = {
  overview: {
    title: "Welcome to Your Subscription Manager",
    content: `
      <div class="help-section">
        <h3>🎯 What This App Does</h3>
        <p>Your Subscription Manager helps you track, manage, and optimize all your recurring subscriptions in one beautiful dashboard.</p>
        
        <h3>✨ Key Features</h3>
        <ul>
          <li><strong>Smart Dashboard:</strong> See all subscriptions organized by category</li>
          <li><strong>Cost Analytics:</strong> Track monthly/yearly spending and potential savings</li>
          <li><strong>Renewal Tracking:</strong> Never miss a payment with countdown timers</li>
          <li><strong>Easy Management:</strong> Add, edit, and delete subscriptions effortlessly</li>
        </ul>
        
        <h3>🚀 Getting Started</h3>
        <p>Click the <strong>"+ Add Subscription"</strong> button to start tracking your first service. The app works best when you add all your subscriptions - this gives you the complete picture of your spending.</p>
      </div>
    `
  },
  addingSubscriptions: {
    title: "Adding Subscriptions",
    content: `
      <div class="help-section">
        <h3>📱 How to Add a New Subscription</h3>
        <ol>
          <li><strong>Click "+ Add Subscription"</strong> in the top right corner</li>
          <li><strong>Choose Category:</strong> Select from Streaming Services, AI Platforms, or Other Services</li>
          <li><strong>Select Service:</strong> Pick from the dropdown or type a custom name</li>
          <li><strong>Enter Cost:</strong> Input your monthly cost (even if you pay yearly)</li>
          <li><strong>Set Billing Cycle:</strong> Choose Monthly or Yearly</li>
          <li><strong>Add Dates:</strong> When you started and when it renews next</li>
          <li><strong>Extra Details:</strong> Plan tier, payment method, auto-renewal status</li>
          <li><strong>Save:</strong> Click "Add Subscription" to save</li>
        </ol>
        
        <h3>💡 Pro Tips</h3>
        <ul>
          <li><strong>Monthly Cost:</strong> Always enter what you actually pay per month</li>
          <li><strong>Yearly Plans:</strong> If you pay $120/year, enter $120 as monthly cost and select "Yearly"</li>
          <li><strong>Next Renewal:</strong> Check your account or email for the exact date</li>
          <li><strong>Categories:</strong> Use the right category to keep your dashboard organized</li>
        </ul>
      </div>
    `
  }
};

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [helpSection, setHelpSection] = useState('overview');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Streaming Services',
    monthly_cost: '',
    billing_cycle: 'monthly',
    start_date: '',
    next_renewal: '',
    tier: 'Basic',
    payment_method: 'Credit Card',
    auto_renewal: true
  });

  // Mock data for demo purposes (since backend may not be available)
  useEffect(() => {
    // Set some sample data for demonstration
    const sampleData = [
      {
        id: '1',
        name: 'Netflix',
        category: 'Streaming Services',
        monthly_cost: 15.99,
        billing_cycle: 'monthly',
        start_date: '2024-01-01',
        next_renewal: '2024-03-01',
        tier: 'Premium',
        payment_method: 'Credit Card',
        auto_renewal: true,
        annual_cost: 191.88,
        monthly_equivalent: 15.99,
        days_until_renewal: 15,
        potential_savings: 28.78
      }
    ];
    
    setSubscriptions(sampleData);
    setAnalytics({
      total_monthly: 15.99,
      total_yearly: 191.88,
      total_savings: 28.78,
      subscription_count: 1,
      upcoming_renewals: [
        { name: 'Netflix', days_until_renewal: 15, cost: 15.99 }
      ]
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add new subscription to the list (demo mode)
    const newSubscription = {
      id: Date.now().toString(),
      ...formData,
      monthly_cost: parseFloat(formData.monthly_cost),
      annual_cost: formData.billing_cycle === 'yearly' ? parseFloat(formData.monthly_cost) : parseFloat(formData.monthly_cost) * 12,
      monthly_equivalent: formData.billing_cycle === 'yearly' ? parseFloat(formData.monthly_cost) / 12 : parseFloat(formData.monthly_cost),
      days_until_renewal: Math.floor(Math.random() * 30),
      potential_savings: parseFloat(formData.monthly_cost) * 0.15
    };
    
    setSubscriptions([...subscriptions, newSubscription]);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  const handleEdit = (subscription) => {
    setFormData({
      name: subscription.name,
      category: subscription.category,
      monthly_cost: subscription.monthly_cost.toString(),
      billing_cycle: subscription.billing_cycle,
      start_date: subscription.start_date,
      next_renewal: subscription.next_renewal,
      tier: subscription.tier,
      payment_method: subscription.payment_method,
      auto_renewal: subscription.auto_renewal
    });
    setEditingId(subscription.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Streaming Services',
      monthly_cost: '',
      billing_cycle: 'monthly',
      start_date: '',
      next_renewal: '',
      tier: 'Basic',
      payment_method: 'Credit Card',
      auto_renewal: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Streaming Services': 'bg-red-500',
      'AI Platforms': 'bg-blue-500',
      'Other Services': 'bg-green-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const groupedSubscriptions = subscriptions.reduce((acc, sub) => {
    if (!acc[sub.category]) {
      acc[sub.category] = [];
    }
    acc[sub.category].push(sub);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💳 Subscription Manager
              </h1>
              <p className="text-gray-600 mt-1">Track and optimize your recurring subscriptions</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowHelp(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                📖 Help & Guide
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                + Add Subscription
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Analytics Dashboard */}
      {analytics && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Total</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.total_monthly)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Yearly Total</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.total_yearly)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💎</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Potential Savings</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(analytics.total_savings)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">📱</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.subscription_count}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Renewals */}
          {analytics.upcoming_renewals && analytics.upcoming_renewals.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 Upcoming Renewals</h3>
              <div className="space-y-3">
                {analytics.upcoming_renewals.map((renewal, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div>
                      <span className="font-medium text-gray-900">{renewal.name}</span>
                      <span className="ml-2 text-sm text-gray-600">
                        {renewal.days_until_renewal === 0 ? 'Due today!' : `${renewal.days_until_renewal} days`}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">{formatCurrency(renewal.cost)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subscriptions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {Object.keys(groupedSubscriptions).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions yet</h3>
            <p className="text-gray-600 mb-6">Start tracking your subscriptions to see insights and savings!</p>
            <div className="space-x-4">
              <button
                onClick={() => setShowHelp(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-3"
              >
                📖 Read the Guide First
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add Your First Subscription
              </button>
            </div>
          </div>
        ) : (
          Object.entries(groupedSubscriptions).map(([category, subs]) => (
            <div key={category} className="mb-8">
              <div className="flex items-center mb-4">
                <div className={`w-4 h-4 rounded-full ${getCategoryColor(category)} mr-3`}></div>
                <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
                <span className="ml-2 text-sm text-gray-500">({subs.length})</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subs.map((subscription) => (
                  <div key={subscription.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{subscription.name}</h3>
                          <p className="text-sm text-gray-600">{subscription.tier}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(subscription)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(subscription.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Monthly Cost:</span>
                          <span className="font-semibold">{formatCurrency(subscription.monthly_equivalent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Annual Cost:</span>
                          <span className="font-semibold">{formatCurrency(subscription.annual_cost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Potential Savings:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(subscription.potential_savings)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${subscription.auto_renewal ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-gray-600">
                            {subscription.auto_renewal ? 'Auto-renews' : 'Manual renewal'}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Next renewal:</p>
                          <p className="font-medium">
                            {subscription.days_until_renewal === 0 ? 'Today!' : `${subscription.days_until_renewal} days`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-90vh overflow-hidden flex">
            {/* Help Navigation */}
            <div className="w-1/3 bg-gray-50 p-6 border-r border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📖 User Guide</h3>
              <nav className="space-y-2">
                {Object.entries(DOCUMENTATION).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setHelpSection(key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      helpSection === key 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Help Content */}
            <div className="w-2/3 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {DOCUMENTATION[helpSection].title}
                </h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div 
                className="prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: DOCUMENTATION[helpSection].content }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId ? 'Edit Subscription' : 'Add Subscription'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <select
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a service or type custom name</option>
                    {PREDEFINED_SERVICES[formData.category]?.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Or enter custom service name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value, name: ''})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.keys(PREDEFINED_SERVICES).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Cost</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.monthly_cost}
                      onChange={(e) => setFormData({...formData, monthly_cost: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                    <select
                      value={formData.billing_cycle}
                      onChange={(e) => setFormData({...formData, billing_cycle: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Next Renewal</label>
                    <input
                      type="date"
                      value={formData.next_renewal}
                      onChange={(e) => setFormData({...formData, next_renewal: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({...formData, tier: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Pro">Pro</option>
                      <option value="Premium">Premium</option>
                      <option value="Family">Family</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select
                      value={formData.payment_method}
                      onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Apple Pay">Apple Pay</option>
                      <option value="Google Pay">Google Pay</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auto_renewal"
                    checked={formData.auto_renewal}
                    onChange={(e) => setFormData({...formData, auto_renewal: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="auto_renewal" className="text-sm text-gray-700">Auto-renewal enabled</label>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingId ? 'Update' : 'Add'} Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
