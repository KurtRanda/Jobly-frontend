import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://jobly-backend-ds7w.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to interact with the API.
 * Centralizes logic for making API requests.
 */

class JoblyApi {
  // Token for authenticating API requests
  static token;

  /** Make an API request.
   *
   * @param {string} endpoint - API endpoint (e.g., "companies", "jobs/1").
   * @param {object} data - Request data (query params for GET, body for POST/PUT).
   * @param {string} method - HTTP method ("get", "post", "patch", "delete").
   *
   * @returns {Promise<object>} Response data.
   * @throws {Error} Throws error with message array on failure.
   */
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Request Error:", err.response || err.message || err);
      const message = err.response?.data?.error?.message || "An unknown error occurred";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Login: Retrieve a token for a user. */
  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    this.token = res.token; // Set the token after successful login
    return res.token;
  }

  /** Signup: Register a new user and retrieve a token. */
  static async signup(data) {
    const res = await this.request("auth/register", data, "post");
    this.token = res.token; // Set the token after successful signup
    return res.token;
  }

  /** Get details of a company by handle. */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of companies, optionally filtered by name. */
  static async getCompanies(filters = {}) {
    const res = await this.request("companies", filters);
    return res.companies;
  }

  /** Create a new company (admin only). */
  static async createCompany(data) {
    const res = await this.request("companies", data, "post");
    return res.company;
  }

  /** Get a list of jobs, optionally filtered by title or other criteria. */
  static async getJobs(filters = {}) {
    const res = await this.request("jobs", filters);
    return res.jobs;
  }

  /** Get details of a specific job by ID. */
  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Create a new job (admin only). */
  static async createJob(data) {
    const res = await this.request("jobs", data, "post");
    return res.job;
  }

  /** Get a list of all users (admin only). */
  static async getUsers() {
    const res = await this.request("users");
    return res.users;
  }

  /** Get details of a specific user by username. */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    console.log("User fetched from API:", res.user); 
    return res.user;
  }

  /** Create a new user (admin only). */
  static async createUser(data) {
    const res = await this.request("users", data, "post");
    return res.user;
  }

  /** Update a user's information. */
  static async updateUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Apply to a job for a user. */
  static async applyToJob(jobId) {
    if (!this.token) throw new Error("Missing authentication token.");
    if (!jobId || isNaN(jobId)) throw new Error(`Invalid jobId provided: ${jobId}`);

    // Decode username from the JWT token
    const { username } = JSON.parse(atob(this.token.split(".")[1]));
    console.log("Applying to job with jobId:", jobId, "for username:", username);

    try {
      const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
      return res.applied;
    } catch (err) {
      console.error("Error during API call for applyToJob:", err);
      throw err;
    }
  }

  /** Get a list of applied jobs for the current user. */
  static async getAppliedJobs(username) {
    try {
      console.log("Making API call to fetch applied jobs for:", username);
      const res = await this.request(`users/${username}/jobs`);
      console.log("API response for applied jobs:", res.jobs);
      return res.jobs;
    } catch (err) {
      console.error("Error fetching applied jobs from API:", err);
      throw err;
    }
  }
}

export default JoblyApi;


