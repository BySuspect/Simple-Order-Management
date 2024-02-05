using System;
using System.Diagnostics;
using System.IO;
using System.Text;

namespace UIFrontend
{
    internal static class Program
    {
        private static void Main()
        {
            var path = Environment.CurrentDirectory.Substring(0, Environment.CurrentDirectory.IndexOf("bin"));
            var exePath = Path.Combine(path, "Frontend");
            var bld = new StringBuilder();
            bld.Append("code .");

            var cmd = new Process
            {
                StartInfo =
                {
                    UseShellExecute = false,
                    FileName = "cmd.exe",
                    WorkingDirectory = exePath,
                    Arguments = @"/c " + bld
                }
            };
            cmd.Start();
            cmd.WaitForExit();
        }
    }
}