﻿using LoanGateway.Models;
using LoanGeteway.Models;

namespace LoanGeteway.Services
{
    public interface ILoanService
    {
        Task<List<Product>> GetProductsList();
        Task<bool> ValidateProductCode(string productCode);
        Task<EligibilityCheckResponse> EligibilityCheck(string productCode, EligibilityCheck request);
        Task<LoanApplicationResponse> SubmitApplication(string productCode, LoanApplication request);
        Task<LoanStatusResponse?> GetStatus(string userId, string arn);
        Task<UserRequestHistory> GetHistory(string userId);
        Task<UserRequestHistory> GetHistory();
        Task<bool> UpdateStatus(StausUpdateRequest request);
        EligibilityCheck ConvertToEligibilityCheckDto(EligibilityCheckRequest eligibility, string productCode);
        LoanApplication ConvertToLoanApplicationDto(LoanApplicationRequest eligibility, string productCode);
    }
}
