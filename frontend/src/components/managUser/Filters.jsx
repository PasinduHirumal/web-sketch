import React from 'react';
import { Shield, CheckCircle2, ArrowDownUp } from 'lucide-react';
import { UserRole } from '../../lib/roles';

export default function Filters({
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    setPage,
    onClose
}) {
    const handleReset = () => {
        setRoleFilter("");
        setStatusFilter("");
        setSortOrder("DESC");
        setPage(1);
    };

    return (
        <div className="flex flex-col h-full justify-between">
            {/* SELECTS LIST */}
            <div className="space-y-6 flex-1">
                {/* ROLE FILTER */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <Shield className="w-3.5 h-3.5 text-blue-500" />
                        User Role
                    </label>
                    <div className="relative">
                        <select
                            value={roleFilter}
                            onChange={(e) => {
                                setRoleFilter(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-3 pr-10 py-2.5 bg-gray-50 hover:bg-gray-100/50 dark:bg-gray-800/40 dark:hover:bg-gray-800/70 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm appearance-none shadow-sm cursor-pointer transition-all"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.75rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.25em 1.25em'
                            }}
                        >
                            <option value="">All Roles</option>
                            <option value={UserRole.USER}>User</option>
                            <option value={UserRole.ADMIN}>Admin</option>
                            <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
                        </select>
                    </div>
                </div>

                {/* STATUS FILTER */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Account Status
                    </label>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-3 pr-10 py-2.5 bg-gray-50 hover:bg-gray-100/50 dark:bg-gray-800/40 dark:hover:bg-gray-800/70 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm appearance-none shadow-sm cursor-pointer transition-all"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.75rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.25em 1.25em'
                            }}
                        >
                            <option value="">All Statuses</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* SORT ORDER */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <ArrowDownUp className="w-3.5 h-3.5 text-indigo-500" />
                        Sort By Registration
                    </label>
                    <div className="relative">
                        <select
                            value={sortOrder}
                            onChange={(e) => {
                                setSortOrder(e.target.value);
                                setPage(1);
                            }}
                            className="w-full pl-3 pr-10 py-2.5 bg-gray-50 hover:bg-gray-100/50 dark:bg-gray-800/40 dark:hover:bg-gray-800/70 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm appearance-none shadow-sm cursor-pointer transition-all"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.75rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.25em 1.25em'
                            }}
                        >
                            <option value="DESC">Newest First</option>
                            <option value="ASC">Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ACTION FOOTER BUTTONS */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <button
                    onClick={handleReset}
                    type="button"
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm active:scale-[0.98] cursor-pointer"
                >
                    Reset All
                </button>
                <button
                    onClick={onClose}
                    type="button"
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl transition shadow-sm active:scale-[0.98] cursor-pointer"
                >
                    Done
                </button>
            </div>
        </div>
    );
}